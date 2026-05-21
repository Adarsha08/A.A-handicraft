import prisma from '../../lib/prisma'

// ── Category Services ──
export const createCategoryService = async (name: string) => {
  return prisma.category.create({ data: { name } })
}

export const updateCategoryService = async (id: string, name: string) => {
  return prisma.category.update({ where: { id }, data: { name } })
}

export const deleteCategoryService = async (id: string) => {
  return prisma.category.delete({ where: { id } })
}

// ── Product Services ──
export const createProductService = async (data: {
  name: string
  description: string
  price: number
  image: string
  stock: number
  categoryId: string
  isBestSeller: boolean
  isExportQuality: boolean
}) => {
  return prisma.product.create({ data, include: { category: true } })
}

export const updateProductService = async (id: string, data: Partial<{
  name: string
  description: string
  price: number
  image: string
  stock: number
  categoryId: string
  isBestSeller: boolean
  isExportQuality: boolean
}>) => {
  return prisma.product.update({ where: { id }, data, include: { category: true } })
}

export const deleteProductService = async (id: string) => {
  return prisma.product.delete({ where: { id } })
}