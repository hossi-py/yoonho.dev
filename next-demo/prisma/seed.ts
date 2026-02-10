import { seedUsers } from './seeds/user.seed';

export async function main() {
  await seedUsers();
}

main();
