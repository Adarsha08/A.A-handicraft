import { Request, Response, NextFunction } from 'express'
import {
  getAllProductsService,
  getProductByIdService,
  getAllCategoriesService
} from './shopServices'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.query.categoryId as string | undefined
    const products = await getAllProductsService(categoryId)
    return res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string
    const product = await getProductByIdService(id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    return res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getAllCategoriesService()
    return res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
}