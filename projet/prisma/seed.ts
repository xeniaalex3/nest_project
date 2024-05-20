import { PrismaClient, Role } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Création des données d'initialisation
  const firstRequest = await prisma.user.upsert({
    where: {
      email: 'chris@marley.fr',
    },
    update: {},
    create: {
      name: 'Chris',
      email: 'chris@marley.fr',
      password: '123456',
      role: Role.USER,
      posts: {
        create: {
          title: 'Meu primeiro post',
          comments: { content: 'Este é um ótimo post!' },
        },
      },
    },
  });

  const secondRequest = await prisma.user.upsert({
    where: {
      email: 'chris@marley.fr',
    },
    update: {},
    create: {
      name: 'Maria',
      email: 'maria@example.com',
      password: '456',
      role: Role.ADMIN,
      posts: {
        create: [
          {
            title: 'Post da Maria',
            comments: { content: 'Belo post, Maria!' },
          },
          {
            title: 'Outro post da Maria',
            comments: { content: 'Continue assim!' },
          },
        ],
      },
    },
  });

  const thirdRequest = await prisma.post.create({
    data: {
      title: 'Outro post da Maria',
      author: {
        connect: { email: 'maria@example.com' },
      },
      comments: { content: 'Continue assim!' },
    },
  });
  await Promise.all([firstRequest, secondRequest, thirdRequest]);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
