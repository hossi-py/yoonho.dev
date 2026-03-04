import { NextResponse } from 'next/server';

import {
  getFrontendBoardOrderState,
  saveFrontendBoardOrderState,
} from '@/lib/frontend-board-state-repository';

export const dynamic = 'force-dynamic';

type Body = {
  state?: Record<string, string[]>;
};

export async function GET() {
  const state = await getFrontendBoardOrderState();
  return NextResponse.json({ state });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const state = body?.state ?? {};
    await saveFrontendBoardOrderState(state);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/frontend/board-order] save failed', error);
    return new NextResponse('Failed to save board order', { status: 500 });
  }
}
