import { NextResponse } from 'next/server';

import { getQuestionById } from '@/lib/questions-repository';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const question = await getQuestionById(id);

    if (!question) {
      return new NextResponse('Not found', { status: 404 });
    }

    return NextResponse.json(question);
  } catch {
    return new NextResponse('Database is not configured', { status: 500 });
  }
}
