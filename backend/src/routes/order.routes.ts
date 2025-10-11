import { Router } from "express";
import { getOrders, deleteOrder, createOrder, getOrderById, cancelOrder, deleteProductInOrder, updateOrderProductAmount, updateOrder } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.patch('/:id/cancel', cancelOrder)
router.delete("/:orderId/product/:productId", deleteProductInOrder);
router.delete('/:orderId', deleteOrder)
router.put("/:orderId/product/:productId", updateOrderProductAmount);
router.put('/:orderId', updateOrder)

export default router;