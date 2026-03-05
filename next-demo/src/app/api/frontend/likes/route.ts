import { randomUUID } from 'crypto';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  getFrontendLikedArticleIds,
  setFrontendArticleLike,
} from '@/lib/frontend-like-repository';

export const dynamic = 'force-dynamic';

const VISITOR_COOKIE = 'frontend_visitor_id';
const LIKES_COOKIE = 'frontend_liked_ids';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const MAX_LIKED_IDS_IN_COOKIE = 120;

function canUseDb() {
  return Boolean(process.env.DATABASE_URL);
}

function parseLikedIds(raw: string | undefined): string[] {
  if (!raw) return [];

  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
      .slice(0, MAX_LIKED_IDS_IN_COOKIE);
  } catch {
    return [];
  }
}

function serializeLikedIds(ids: string[]) {
  const normalized = ids
    .filter((id) => id.trim().length > 0)
    .slice(0, MAX_LIKED_IDS_IN_COOKIE);
  return encodeURIComponent(JSON.stringify(normalized));
}

function upsertLikedIds(ids: string[], articleId: string, liked: boolean) {
  if (!articleId) return ids;
  if (liked) {
    if (ids.includes(articleId)) return ids;
    return [articleId, ...ids].slice(0, MAX_LIKED_IDS_IN_COOKIE);
  }
  return ids.filter((id) => id !== articleId);
}

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

function withLikedCookie(res: NextResponse, likedIds: string[]) {
  res.cookies.set(LIKES_COOKIE, serializeLikedIds(likedIds), {
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
    const cookieStore = await cookies();
    const fallbackLikedIds = parseLikedIds(cookieStore.get(LIKES_COOKIE)?.value);

    const likedIds = canUseDb()
      ? await getFrontendLikedArticleIds(visitorId)
      : fallbackLikedIds;
    const finalLikedIds = likedIds.length > 0 ? likedIds : fallbackLikedIds;

    const response = withVisitorCookie(NextResponse.json({ likedIds: finalLikedIds }), visitorId, created);
    return withLikedCookie(response, finalLikedIds);
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
    const cookieStore = await cookies();
    const fallbackLikedIds = parseLikedIds(cookieStore.get(LIKES_COOKIE)?.value);
    const optimisticLikedIds = upsertLikedIds(fallbackLikedIds, articleId, liked);

    let likedIds = optimisticLikedIds;
    if (canUseDb()) {
      await setFrontendArticleLike(visitorId, articleId, liked);
      const dbLikedIds = await getFrontendLikedArticleIds(visitorId);
      const dbStateMatches = dbLikedIds.includes(articleId) === liked;
      likedIds = dbStateMatches ? dbLikedIds : optimisticLikedIds;
    }

    const response = withVisitorCookie(
      NextResponse.json({ ok: true, likedIds }),
      visitorId,
      created,
    );
    return withLikedCookie(response, likedIds);
  } catch (error) {
    console.error('[api/frontend/likes] save failed', error);
    return new NextResponse('Failed to save like', { status: 500 });
  }
}
