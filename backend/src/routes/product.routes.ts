import { Router } from "express";
import { createProduct, getProducts, getProductsById, getProductByCategory, updateProduct, deleteProduct, getProductsFeatured, getImagesByProductId } from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth";

import { requireRole } from "../middlewares/requireRole";


const router = Router()

//public routes
router.get('/', getProducts);
router.get('/featured', getProductsFeatured);
router.get('/category/:categoryId', getProductByCategory);
router.get('/image/:id', getImagesByProductId)
router.get('/:id', getProductsById);



//admin routes
router.post('/', authenticate, requireRole('68c448d6b93e0784df24f2ce'), createProduct);
router.put('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), updateProduct);
router.delete('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), deleteProduct);

export default router
