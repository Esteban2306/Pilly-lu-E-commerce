import { Router } from "express";
import { addItemToCart, removeItemFromCart, getCartByUserId, clearCart } from "../controllers/cart.controller";
import { optionalAuth } from "../middlewares/optionalAuth";

const router = Router()


router.post('/add', optionalAuth, addItemToCart)
router.delete('/:productId/remove', optionalAuth, removeItemFromCart)
router.get('/', optionalAuth, getCartByUserId)
router.delete('/clear', optionalAuth, clearCart)

export default router