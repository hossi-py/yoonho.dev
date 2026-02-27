import { seedQuestions } from './seeds/question.seed';
import { seedUsers } from './seeds/user.seed';

export async function main() {
  await seedUsers();
  await seedQuestions();
}

main();
