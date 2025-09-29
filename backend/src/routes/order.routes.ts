import { Router } from "express";
import { getOrdersByUserId, createOrder, getOrderById, cancelOrder } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.post('/', createOrder);
router.get('/user/:id', getOrdersByUserId);
router.get('/:orderId', getOrderById);
router.patch('/:id/cancel', cancelOrder)

export default router;