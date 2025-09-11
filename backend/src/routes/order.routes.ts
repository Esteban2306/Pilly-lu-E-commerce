import { Router } from "express";
import { getOrdersByUserId, createOrder, getOrderById, cancelOrder } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.use(authenticate)

router.post('/', createOrder);
router.get('/user/:id', getOrdersByUserId);
router.get('/:id', getOrderById);
router.patch('/:id/cancel', cancelOrder)

export default router;