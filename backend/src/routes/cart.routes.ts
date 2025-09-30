import { Router } from "express";
import { addItemToCart, removeItemFromCart, getCartByUserId, clearCart, updateItemCuantity } from "../controllers/cart.controller";
import { optionalAuth } from "../middlewares/optionalAuth";

const router = Router()


router.post('/add', optionalAuth, addItemToCart)
router.put('/:productId', optionalAuth, updateItemCuantity)
router.delete('/:productId/remove', optionalAuth, removeItemFromCart)
router.get('/', optionalAuth, getCartByUserId)
router.delete('/clear', optionalAuth, clearCart)

export default router