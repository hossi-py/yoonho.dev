import getPrismaClient from './prisma';

let ensureTablePromise: Promise<void> | null = null;

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
      CREATE TABLE IF NOT EXISTS frontend_article_like (
        visitor_id TEXT NOT NULL,
        article_id TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (visitor_id, article_id)
      )
    `);
  })();

  await ensureTablePromise;
}

export async function getFrontendLikedArticleIds(visitorId: string): Promise<string[]> {
  if (!canUseDb() || !visitorId) return [];

  try {
    await ensureTable();
    const prisma = getPrismaClient();
    const rows = await prisma.$queryRawUnsafe<Array<{ article_id: string }>>(
      `SELECT article_id FROM frontend_article_like WHERE visitor_id = $1 ORDER BY created_at DESC`,
      visitorId,
    );
    return rows.map((row) => row.article_id);
  } catch (error) {
    console.error('[frontend-like-repository] get failed', error);
    return [];
  }
}

export async function setFrontendArticleLike(
  visitorId: string,
  articleId: string,
  liked: boolean,
): Promise<void> {
  if (!canUseDb() || !visitorId || !articleId) return;

  try {
    await ensureTable();
    const prisma = getPrismaClient();

    if (liked) {
      await prisma.$executeRawUnsafe(
        `
        INSERT INTO frontend_article_like (visitor_id, article_id, created_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (visitor_id, article_id)
        DO NOTHING
        `,
        visitorId,
        articleId,
      );
      return;
    }

    await prisma.$executeRawUnsafe(
      `DELETE FROM frontend_article_like WHERE visitor_id = $1 AND article_id = $2`,
      visitorId,
      articleId,
    );
  } catch (error) {
    console.error('[frontend-like-repository] save failed', error);
  }
}
