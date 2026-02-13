import getPrismaClient from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  let users: { id: number; email: string; name: string | null }[] | null = null;

  try {
    users = await getPrismaClient().user.findMany({
      orderBy: { id: 'asc' },
    });
  } catch (error) {
    users = null;
  }

  if (!users) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        DATABASE_URL is missing or the database is unavailable.
      </div>
    );
  }

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
