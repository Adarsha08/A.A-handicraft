// admin.routes.ts
import { Router } from 'express'
import { protect } from '../../middlewares/authMiddleware'
import { createProduct, updateProduct, deleteProduct, createCategory, updateCategory, deleteCategory } from './adminController'

const router = Router()

// all routes below are protected
router.use(protect) // attach once here, applies to all routes below

router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

router.post('/categories', createCategory)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)

export default router