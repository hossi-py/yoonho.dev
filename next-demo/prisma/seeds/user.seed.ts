import { PrismaClient } from '@prisma/client/scripts/default-index.js';

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Hossi',
    email: 'Hossi@prisma.io',
  },
];

export async function seedUsers() {
  for (const u of userData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name },
      create: u,
    });
  }
}
