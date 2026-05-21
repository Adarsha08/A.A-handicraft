import prisma from '../../lib/prisma'

export const getAllProductsService = async (categoryId?: string) => {
  return prisma.product.findMany({
    where: categoryId ? { categoryId } : {},
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })
}

export const getProductByIdService = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true }
  })
}

export const getAllCategoriesService = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
}