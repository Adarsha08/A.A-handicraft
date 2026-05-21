import { Response, NextFunction } from 'express'
import { AuthRequest } from '../../middlewares/authMiddleware'
import {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  createProductService,
  updateProductService,
  deleteProductService
} from './adminService'

// ── Category Controllers ──
export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Category name is required' })
    const category = await createCategoryService(name)
    return res.status(201).json({ message: 'Category created', category })
  } catch (err) {
    next(err)
  }
}

export const updateCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    const { name } = req.body
    const category = await updateCategoryService(id, name)
    return res.status(200).json({ message: 'Category updated', category })
  } catch (err) {
    next(err)
  }
}

export const deleteCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    await deleteCategoryService(id)
    return res.status(200).json({ message: 'Category deleted' })
  } catch (err) {
    next(err)
  }
}

// ── Product Controllers ──
export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, image, stock, categoryId, isBestSeller, isExportQuality } = req.body
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const product = await createProductService({
      name, description, price, image, stock, categoryId,
      isBestSeller: isBestSeller ?? false,
      isExportQuality: isExportQuality ?? true
    })
    return res.status(201).json({ message: 'Product created', product })
  } catch (err) {
    next(err)
  }
}

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    const product = await updateProductService(id, req.body)
    return res.status(200).json({ message: 'Product updated', product })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    await deleteProductService(id)
    return res.status(200).json({ message: 'Product deleted' })
  } catch (err) {
    next(err)
  }
}