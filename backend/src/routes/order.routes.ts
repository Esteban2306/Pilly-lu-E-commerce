import { Router } from "express";
import { getOrdersByUserId, createOrder, getOrderById, cancelOrder, deleteProductInOrder, updateOrderProductAmount } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.post('/', createOrder);
router.get('/user/:id', getOrdersByUserId);
router.get('/:orderId', getOrderById);
router.patch('/:id/cancel', cancelOrder)
router.delete("/:orderId/product/:productId", deleteProductInOrder);
router.put("/:orderId/product/:productId", updateOrderProductAmount);

export default router;