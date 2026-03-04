import { randomUUID } from 'crypto';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  getFrontendLikedArticleIds,
  setFrontendArticleLike,
} from '@/lib/frontend-like-repository';

export const dynamic = 'force-dynamic';

const VISITOR_COOKIE = 'frontend_visitor_id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

async function getOrCreateVisitorId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(VISITOR_COOKIE)?.value;
  if (existing && existing.trim().length > 0) {
    return { visitorId: existing, created: false };
  }

  return { visitorId: randomUUID(), created: true };
}

function withVisitorCookie(
  res: NextResponse,
  visitorId: string,
  created: boolean,
) {
  if (!created) return res;
  res.cookies.set(VISITOR_COOKIE, visitorId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

export async function GET() {
  try {
    const { visitorId, created } = await getOrCreateVisitorId();
    const likedIds = await getFrontendLikedArticleIds(visitorId);
    return withVisitorCookie(NextResponse.json({ likedIds }), visitorId, created);
  } catch (error) {
    console.error('[api/frontend/likes] get failed', error);
    return new NextResponse('Failed to load likes', { status: 500 });
  }
}

type Body = {
  articleId?: string;
  liked?: boolean;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const articleId = typeof body.articleId === 'string' ? body.articleId.trim() : '';
    const liked = Boolean(body.liked);

    if (!articleId) {
      return new NextResponse('articleId is required', { status: 400 });
    }

    const { visitorId, created } = await getOrCreateVisitorId();
    await setFrontendArticleLike(visitorId, articleId, liked);
    const likedIds = await getFrontendLikedArticleIds(visitorId);

    return withVisitorCookie(NextResponse.json({ ok: true, likedIds }), visitorId, created);
  } catch (error) {
    console.error('[api/frontend/likes] save failed', error);
    return new NextResponse('Failed to save like', { status: 500 });
  }
}
