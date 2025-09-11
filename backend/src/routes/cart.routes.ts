import { Router } from "express";
import { addItemToCart, removeItemFromCart, getCartByUserId, clearCart } from "../controllers/cart.controller";
import { optionalAuth } from "../middlewares/optionalAuth";

const router = Router()

router.use(optionalAuth)

router.post('/add', addItemToCart)
router.delete('/remove', removeItemFromCart)
router.get('/:userId', getCartByUserId)
router.delete('/clear', clearCart)

export default router