import { Router } from "express";
import { createProduct, getProducts, getProductsById, getProductByCategory, updateProduct, deleteProduct, } from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth";

import { requireRole } from "../middlewares/requireRole";


const router = Router()

//public routes
router.get('/', getProducts);
router.get('/:id', getProductsById);
router.get('/category/:categoryId', getProductByCategory);

//admin routes
router.post('/', authenticate, requireRole('admin'), createProduct);
router.put('/:id', authenticate, requireRole('admin'), updateProduct);
router.delete('/:id', authenticate, requireRole('admin'), deleteProduct);

export default router
