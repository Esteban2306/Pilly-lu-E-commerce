import { Order } from "../models/order";
import { Cart } from "../models/cart";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found";
import BadRequest from "../middlewares/bad-request";
import mongoose from "mongoose";


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;

        const cartData = await Cart.aggregate([

            /*se filtra el carrito del usuario */
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            { $unwind: '$products' },

            /*join con la coleccion porducts */
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },

            /* desempaquta el array de lookup*/
            { $unwind: '$productInfo' },

            {
                $project: {
                    product: '$productInfo._id',
                    amount: '$products.amount',
                    price: '$productInfo.price',
                    stock: '$productInfo.stock',
                    subtotal: { $multiply: ['$products.amount', '$productInfo.price'] },
                    insufficient: { $cond: [{ $lt: ['$products.stock', '$products.amount'] }, 1, 0] } //cond es lo mismo que '? a : b'
                }
            },

            {
                $group: {
                    _id: null,
                    items: {
                        $push: { product: '$product', amount: '$amount', price: '$price' }
                    },
                    total: { $sum: '$subtotal' },
                    insufficientCount: { $sum: '$insufficient' }
                }
            }
        ])

        if (!cartData || cartData.length === 0) {
            throw new BadRequest('el carrito se encuentra vacio')
        }

        const { items, total } = cartData[0]

        const order = await Order.create({
            user: userId,
            products: items,
            total
        })

        await Order.updateOne(
            { user: userId },
            { $set: { products: [] } }
        )

        res.status(201).json({
            message: 'Orden creada exitosamente',
            order
        })

    } catch (err) {
        next(err)
    }
}

const getOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const userObjectId = new mongoose.Types.ObjectId(id);

        const order = await Order.find({ user: userObjectId })
            .populate('user', 'name email')
            .populate('products.product', 'productName price')

        if (!order) {
            throw new NotFoundError('no hay ordenes creadas para este usuario')
        }

        res.status(200).json({
            message: 'orden encontrada con exito',
            order
        })
    } catch (err) {
        next(err)
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('products.product', 'productName price')

        if (!order) {
            throw new NotFoundError('no hay ordenes creadas para este usuario')
        }

        res.status(200).json({
            message: 'orden encontrada con exito',
            order
        })
    } catch (err) {
        next(err)
    }
}

const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)

        if (!order) {
            throw new NotFoundError('orden no encontrada')
        }

        if (["enviado", "pagado", "entregado"].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot cancel order in status '${order.status}'.`
            });
        }

        order.status = ('cancelado')

        await order.save()

        res.status(200).json(order)
    } catch (err) {
        next(err)
    }
}

export {
    getOrdersByUserId,
    createOrder,
    getOrderById,
    cancelOrder
}

