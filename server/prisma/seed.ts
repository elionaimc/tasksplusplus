// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy recipes
  const task1 = await prisma.task.upsert({
    where: { title: 'Initial Task' },
    update: {},
    create: {
      title: 'Initial Task',
      description: 'Initial task description',
    }
  });

  const task2 = await prisma.task.upsert({
    where: { title: 'Another Task' },
    update: {},
    create: {
      title: 'Another Task',
      description: 'Another common task',
    }
  });

  console.log({ task1, task2 });
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });