import prisma from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  // Delete existing admin if exists
  await prisma.admin.deleteMany({
    where: { email: 'admin@aahandicraft.com' }
  })

  const hashed = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@aahandicraft.com',
      password: hashed
    }
  })

  console.log('Admin seeded:', admin.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())