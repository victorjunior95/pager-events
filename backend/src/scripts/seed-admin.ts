import 'dotenv/config';

import * as argon2 from 'argon2';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.');
  }

  if (!name || !email || !password) {
    throw new Error(
      'ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be configured.',
    );
  }

  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters long.');
  }

  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });

  const prisma = new PrismaClient({
    adapter,
  });

  try {
    const productionArea = await prisma.area.upsert({
      where: {
        name_type: {
          name: 'Produção',
          type: 'SETOR',
        },
      },
      update: {},
      create: {
        name: 'Produção',
        type: 'SETOR',
      },
    });

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const passwordHash = await argon2.hash(password);

      user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'ADMIN',
          active: true,
        },
      });

      console.log(`Admin user created: ${user.email}`);
    } else {
      console.log(`User ${email} already exists.`);
    }

    await prisma.userArea.upsert({
      where: {
        userId_areaId: {
          userId: user.id,
          areaId: productionArea.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        areaId: productionArea.id,
      },
    });

    console.log(
      `Admin user ${user.email} is associated with area ${productionArea.name}.`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
