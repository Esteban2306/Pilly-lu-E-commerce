import { Router } from "express";
import { createProduct, getProducts, getProductsById, getProductByCategory, updateProduct, deleteProduct, getProductsFeatured, getImagesByProductId, toggleFeatured, updateImage, addImagesToProduct, getRelatedProducts } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.js";

import { requireRole } from "../middlewares/requireRole.js";


const router = Router()

//public routes
router.get('/', getProducts);
router.get('/featured', getProductsFeatured);
router.get('/category/:categoryId', getProductByCategory);
router.get('/image/:id', getImagesByProductId);
router.get('/related/:id', getRelatedProducts)
router.get('/:id', getProductsById);




//admin routes
router.post('/', authenticate, requireRole('68c448d6b93e0784df24f2ce'), createProduct);
router.post('/:id/images', authenticate, requireRole('68c448d6b93e0784df24f2ce'), addImagesToProduct)
router.put('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), updateProduct);
router.put('/images/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), updateImage)
router.delete('/:id', authenticate, requireRole('68c448d6b93e0784df24f2ce'), deleteProduct);
router.patch('/:id/toggleFeatured', authenticate, requireRole('68c448d6b93e0784df24f2ce'), toggleFeatured)

export default router
