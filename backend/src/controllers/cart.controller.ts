import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found";
import { v4 as uuid } from "uuid";

const resolveCartIdentifier = (req: Request, res: Response) => {
    if (req.header) {
        return { type: 'user', id: res.locals.userId };
    }

    let cartId = req.cookies?.cartId;
    if (!cartId) {
        cartId = uuid();
        res.cookie('cartId', cartId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
    }

    return { type: 'anon', id: cartId }
}

const addItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, amount } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const { type, id } = resolveCartIdentifier(req, res);
        const query = type === "user" ? { user: id } : { anonId: id };

        let cart = await Cart.findOneAndUpdate(
            { ...query, "products.product": productId },
            { $inc: { "products.$.amount": amount } },
            { new: true }
        );

        if (!cart) {
            cart = await Cart.findOneAndUpdate(
                query,
                { $push: { products: { product: productId, amount } } },
                { new: true, upsert: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: "producto agregado al carrito",
            cart,
        });

    } catch (err) {
        next(err);
    }
};

const removeItemFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.body
        const { type, id } = resolveCartIdentifier(req, res);
        const query = type === "user" ? { user: id } : { anonId: id };

        const cart = await Cart.findOneAndUpdate(
            query,
            { $pull: { products: { product: productId } } },
            { new: true }
        )
        if (!cart) {
            throw new NotFoundError('carrito no encontrado')
        }

        return res.status(200).json({
            success: true,
            message: "producto eliminado del carrito",
            cart
        });
    } catch (err) {
        next(err)
    }
}

const getCartByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, id } = resolveCartIdentifier(req, res);
        const query = type === "user" ? { user: id } : { anonId: id };

        const cart = await Cart.findOne(query)
            .populate('products.product', 'name, price, image')

        if (!cart) {
            throw new NotFoundError('carrito no encontrado')
        }

        res.status(200).json(cart)
    } catch (err) {
        next(err)
    }
}

const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, id } = resolveCartIdentifier(req, res);
        const query = type === "user" ? { user: id } : { anonId: id };


        const cart = await Cart.findOneAndUpdate(
            query,
            { $set: { products: [] } },
            { new: true }
        )

        console.log(cart)

        if (!cart) {
            throw new NotFoundError('carrito no encontrado')
        }

        res.status(200).json(cart)
    } catch (err) {
        next(err)
    }
}

export {
    addItemToCart,
    removeItemFromCart,
    getCartByUserId,
    clearCart
}