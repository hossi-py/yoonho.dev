import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Hossi',
    email: 'Hossi@prisma.io',
  },
];

export async function seedUsers() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}
