import { Order } from "../models/order.js";
import { Cart } from "../models/cart.js";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found.js";
import BadRequest from "../middlewares/bad-request.js";
import mongoose from "mongoose";
import { OrderType } from "../types/order.type.js";


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;

        const cartData = await Cart.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productInfo",
                },
            },
            { $unwind: "$productInfo" },
            {
                $project: {
                    product: "$productInfo._id",
                    amount: "$products.amount",
                    price: { $toDouble: "$productInfo.price" },
                    finalPrice: {
                        $cond: {
                            if: { $gt: [{ $type: "$productInfo.price" }, "$productInfo.finalPrice"] },
                            then: { $toDouble: "$productInfo.finalPrice" },
                            else: { $toDouble: "$productInfo.price" }
                        }
                    },
                    offer: "$productInfo.offer",
                    subtotal: { $multiply: ["$products.amount", { $toDouble: "$productInfo.price" }] },
                    totalWithDiscount: {
                        $multiply: [
                            "$products.amount",
                            {
                                $cond: {
                                    if: { $gt: [{ $type: "$productInfo.price" }, "$productInfo.finalPrice"] },
                                    then: { $toDouble: "$productInfo.finalPrice" },
                                    else: { $toDouble: "$productInfo.price" }
                                }
                            }
                        ]
                    },
                }
            },
            {
                $group: {
                    _id: null,
                    items: {
                        $push: {
                            product: "$product",
                            amount: "$amount",
                            price: "$price",
                            finalPrice: "$finalPrice",
                            offer: "$offer",
                        },
                    },
                    subtotal: { $sum: "$subtotal" },
                    total: { $sum: "$totalWithDiscount" },
                    totalDiscount: {
                        $sum: {
                            $subtract: ["$subtotal", "$totalWithDiscount"],
                        },
                    },
                },
            },
        ]);

        if (!cartData.length) throw new BadRequest("El carrito está vacío");

        const { items, subtotal, total } = cartData[0];

        const totalDiscount = subtotal - total;

        const order = await Order.create({
            user: userId,
            products: items,
            subtotal: subtotal || 0,
            total: total || subtotal,
            totalDiscount: totalDiscount || 0,
        });

        const whatsappLink = `https://wa.me/573144455235?text=${encodeURIComponent(
            `*Nueva orden creada*\n\n*Orden ID:* ${order._id}\n*Total:* $${order.total}\n\nVer detalles:\nhttps://pillylu.qzz.io/order/${order._id}`
        )}`;

        res.status(201).json({
            message: "Orden creada exitosamente",
            order,
            whatsappLink,
        });
    } catch (err) {
        next(err);
    }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, status, dateFrom, dateTo, sort } = req.query;

        const filter: any = {};

        if (status && status !== "all") {
            filter.status = status;
        }

        if (dateFrom || dateTo) {
            filter.createdAt = {};
            if (dateFrom) filter.createdAt.$gte = new Date(dateFrom as string);
            if (dateTo) filter.createdAt.$lte = new Date(dateTo as string);
        }

        let query = Order.find(filter)
            .populate({
                path: "user",
                select: "firstName lastName email _id",
            })
            .populate({
                path: "products.product",
                select: "productName price finalPrice images.url",
            });

        if (search) {
            query = query.find({
                $or: [
                    { "user.firstName": { $regex: search, $options: "i" } },
                    { "user.lastName": { $regex: search, $options: "i" } },
                    { "user.email": { $regex: search, $options: "i" } },
                    { _id: { $regex: search, $options: "i" } },
                ],
            });
        }

        if (sort) {
            const [field, direction] = (sort as string).split("_");
            query = query.sort({ [field]: direction === "desc" ? -1 : 1 });
        }

        const orders = await query.exec();

        if (!orders.length) {
            throw new NotFoundError("No hay órdenes registradas");
        }

        const formatted = orders.map(o => ({
            _id: o._id,
            total: o.total,
            status: o.status,
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
            user: o.user
                ? {
                    name: `${(o.user as any).firstName || ""} ${(o.user as any).lastName || ""}`.trim(),
                    email: (o.user as any).email || "N/A",
                }
                : { name: "Usuario eliminado", email: "" },
        }));

        res.status(200).json({ message: "Órdenes encontradas con éxito", order: formatted });
    } catch (err) {
        next(err);
    }
};


const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate({
                path: 'products.product',
                select: 'productName price finalPrice images sku stock amount',
                populate: {
                    path: 'images',
                    select: 'url'
                }
            }) as OrderType | null;

        if (!order) {
            throw new NotFoundError('no hay ordenes creadas para este usuario')
        }


        order.products = order.products.map((item: any) => ({
            product: { ...item.product, amount: item.amount, subtotal: item.subtotal }
        }))

        res.status(200).json({
            message: 'orden encontrada con exito',
            order
        })
    } catch (err) {
        next(err)
    }
}

const getAllOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequest('ID de usuario invalido')
        }

        const orders = await Order.find({ user: userId })
            .populate({
                path: 'products.product',
                select: 'productName price finalPrice images sku stock amount',
                populate: {
                    path: 'images',
                    select: 'url'
                }
            })
            .populate({
                path: 'user',
                select: 'firstName lastName email'
            })
            .sort({ createdAt: -1 });

        if (!orders.length) {
            throw new NotFoundError('No se encuentran ordenes hechas en este usuario.')
        }

        const formattedOrders = orders.map(order => ({
            _id: order._id,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            products: order.products.map((item: any) => ({
                name: item.product?.productName || "Producto eliminado",
                price: item.price,
                amount: item.amount,
                subtotal: item.amount * item.price,
                images: new Array({ url: item.product?.images?.[0]?.url }) || null,
            })),
        }))

        res.status(200).json({
            message: 'Órdenes del usuario encontradas con exito.',
            formattedOrders
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

const deleteProductInOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId, productId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) throw new NotFoundError("Orden no encontrada");

        if (order.status !== "pendiente") {
            throw new BadRequest(`No puedes eliminar productos en una orden con estado '${order.status}'`);
        }

        order.products = order.products.filter(
            (item: any) => item.product.toString() !== productId
        );

        order.total = order.products.reduce(
            (acc: number, item: any) => acc + (item.amount * (item.product?.finalPrice || item.product?.price || 0)),
            0
        );
        order.subtotal = order.products.reduce(
            (acc: number, item: any) => acc + (item.amount * (item.product?.price || 0)),
            0
        );
        order.totalDiscount = order.subtotal - order.total;

        await order.save();

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $pull: { products: { product: new mongoose.Types.ObjectId(productId) } } },
            { new: true }
        ).populate({
            path: "products.product",
            select: "productName price finalPrice images",
            populate: { path: "images", select: "url" }
        });

        res.status(200).json({
            success: true,
            message: "Producto eliminado de la orden",
            order: updatedOrder,
        });
    } catch (err) {
        next(err);
    }
};

const updateOrderProductAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId, productId } = req.params;
        const { amount } = req.body;

        if (!amount || amount < 1) throw new BadRequest("Cantidad inválida");

        const order = await Order.findById(orderId).populate({
            path: "products.product",
            select: "price finalPrice",
        });

        if (!order) throw new NotFoundError("Orden no encontrada");
        if (order.status !== "pendiente") throw new BadRequest("Solo puedes editar órdenes pendientes");

        const item = order.products.find(p => p.product._id.toString() === productId);
        if (!item) throw new NotFoundError("Producto no encontrado en la orden");

        item.amount = amount;

        order.subtotal = order.products.reduce(
            (acc, p: any) => acc + Number(p.product.price) * p.amount,
            0
        );

        order.total = order.products.reduce(
            (acc, p: any) => acc + Number(p.product.finalPrice) * p.amount,
            0
        );

        order.totalDiscount = order.subtotal - order.total;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Cantidad actualizada correctamente",
            order,
        });
    } catch (err) {
        next(err);
    }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;

        const data = await Order.findById(orderId);

        if (!data) {
            throw new NotFoundError('Orden no encotrada')
        }
        await data.deleteOne()

        res.status(200).json({
            mesasge: 'Orden eliminada con exito',
            data
        })
    } catch (err) {
        next(err)
    }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Order.findByIdAndUpdate(
            req.params.orderId,
            req.body,
            { new: true, runValidators: true }
        )
        if (!data) {
            throw new NotFoundError('orden no encontrada')
        }

        res.status(200).json({
            message: 'orden editada con exito',
            data
        })
    } catch (err) {
        next(err)
    }
}

export {
    getOrders,
    createOrder,
    getOrderById,
    cancelOrder,
    deleteProductInOrder,
    updateOrderProductAmount,
    deleteOrder,
    updateOrder,
    getAllOrdersByUserId
}

