import getPrismaClient from './prisma';

const STATE_KEY = 'frontend-latest-board';
let ensureTablePromise: Promise<void> | null = null;

type BoardOrderState = Record<string, string[]>;

function canUseDb() {
  return Boolean(process.env.DATABASE_URL);
}

async function ensureTable() {
  if (!canUseDb()) return;
  if (ensureTablePromise) {
    await ensureTablePromise;
    return;
  }

  ensureTablePromise = (async () => {
    const prisma = getPrismaClient();
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS frontend_board_state (
        key TEXT PRIMARY KEY,
        state JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
  })();

  await ensureTablePromise;
}

function sanitizeState(input: unknown): BoardOrderState {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {};
  }

  const out: BoardOrderState = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!Array.isArray(v)) continue;
    const ids = v.filter((id): id is string => typeof id === 'string');
    out[k] = ids;
  }
  return out;
}

export async function getFrontendBoardOrderState(): Promise<BoardOrderState> {
  if (!canUseDb()) return {};

  try {
    await ensureTable();
    const prisma = getPrismaClient();

    const rows = await prisma.$queryRawUnsafe<Array<{ state: unknown }>>(
      `SELECT state FROM frontend_board_state WHERE key = $1 LIMIT 1`,
      STATE_KEY,
    );

    if (rows.length === 0) return {};
    return sanitizeState(rows[0].state);
  } catch (error) {
    console.error('[frontend-board-state] get failed', error);
    return {};
  }
}

export async function saveFrontendBoardOrderState(state: BoardOrderState): Promise<void> {
  if (!canUseDb()) return;

  try {
    await ensureTable();
    const prisma = getPrismaClient();

    await prisma.$executeRawUnsafe(
      `
      INSERT INTO frontend_board_state (key, state, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (key)
      DO UPDATE SET state = EXCLUDED.state, updated_at = NOW()
      `,
      STATE_KEY,
      JSON.stringify(sanitizeState(state)),
    );
  } catch (error) {
    console.error('[frontend-board-state] save failed', error);
  }
}
