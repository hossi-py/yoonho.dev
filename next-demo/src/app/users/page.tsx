import prisma from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' },
  });

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
