/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Helper to hash passwords using pbkdf2 - matches server authentication logic
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Seeding database...');
  
  // Seed admin user
  const adminEmail = 'admin@danmol.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });
  
  if (!existingAdmin) {
    const passwordHash = hashPassword('Admin@2026');
    await prisma.user.create({
      data: {
        name: 'D Anmol Admin',
        email: adminEmail,
        phone: '9041687157',
        password: passwordHash,
        role: 'ADMIN',
      }
    });
    console.log(`Default admin created successfully!`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: Admin@2026`);
  } else {
    console.log('Admin user already exists in database.');
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
