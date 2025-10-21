import { Router } from "express";
import { getOrders, deleteOrder, createOrder, getOrderById, cancelOrder, deleteProductInOrder, updateOrderProductAmount, updateOrder, getAllOrdersByUserId } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth";

const router = Router()


router.get('/user/:userId', getAllOrdersByUserId)
router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.patch('/:id/cancel', cancelOrder)
router.put("/:orderId/product/:productId", updateOrderProductAmount);
router.put('/:orderId', updateOrder)
router.delete("/:orderId/product/:productId", deleteProductInOrder);
router.delete('/:orderId', deleteOrder)


export default router;