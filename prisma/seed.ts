import { prisma } from '../src/db.js';

async function main() {
  const count = await prisma.project.count();
  if (count > 0) return;

  await prisma.project.createMany({
    data: [{ name: 'PocketPM Alpha' }, { name: 'Personal Tasks' }],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
