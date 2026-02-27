import { NextResponse } from 'next/server';

import { searchQuestionPosts } from '@/lib/questions-repository';

export const dynamic = 'force-dynamic';

function toPositiveInt(value: string | null, fallback: number) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return fallback;
  return Math.floor(num);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') ?? undefined;
    const examCode = searchParams.get('examCode') ?? undefined;
    const q = searchParams.get('q') ?? undefined;
    const page = toPositiveInt(searchParams.get('page'), 1);
    const pageSize = Math.min(toPositiveInt(searchParams.get('pageSize'), 20), 100);

    const { items, total } = await searchQuestionPosts({
      category,
      examCode,
      query: q,
      page,
      pageSize,
    });

    return NextResponse.json({
      page,
      pageSize,
      total,
      items,
    });
  } catch {
    return new NextResponse('Database is not configured', { status: 500 });
  }
}
