import { NextResponse } from 'next/server';

import getPrismaClient from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await getPrismaClient().user.findMany();
    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse('Database is not configured', { status: 500 });
  }
}
