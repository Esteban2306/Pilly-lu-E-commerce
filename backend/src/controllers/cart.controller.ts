import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found";

import { v4 as uuid } from "uuid";

import mongoose, { ObjectId } from "mongoose";
import BadRequest from "../middlewares/bad-request";
import { success } from "zod";

interface resolveCartType {
    type: string,
    id: string | ObjectId,
}

const resolveCartIdentifier = (req: Request, res: Response, strict: boolean): resolveCartType | null => {
    if (req.userId) {
        return { type: 'user', id: req.userId };
    }

    let cartId = req.cookies?.cartId;
    if (!cartId) {
        if (strict) {
            return null
        }
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

        const objectserolveCart = resolveCartIdentifier(req, res, true);
        const query = objectserolveCart?.type === "user" ? { user: objectserolveCart.id } : { anonId: objectserolveCart?.id };


        let cart = await Cart.findOneAndUpdate(
            { ...query, "products.product": productId },
            { $inc: { "products.$.amount": amount } },
            { new: true }
        ).populate({
            path: 'products.product',
            select: 'productName price images',
            populate: {
                path: 'images',
                select: 'url',
            },
        })

        if (!cart) {
            cart = await Cart.findOneAndUpdate(
                query,
                { $push: { products: { product: productId, amount } } },
                { new: true, upsert: true }
            ).populate({
                path: 'products.product',
                select: 'productName price images',
                populate: {
                    path: 'images',
                    select: 'url',
                },
            })
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
        const { productId } = req.params;

        const objectserolveCart = resolveCartIdentifier(req, res, false);
        const query = objectserolveCart?.type === "user" ? { user: objectserolveCart.id } : { anonId: objectserolveCart?.id };


        const cart = await Cart.findOneAndUpdate(
            query,
            { $pull: { products: { product: productId } } },
            { new: true }
        ).populate({
            path: 'products.product',
            select: 'productName price images',
            populate: {
                path: 'images',
                select: 'url',
            },
        })

        if (!cart) {
            throw new NotFoundError('carrito no encontrado')
        }

        return res.status(200).json({
            success: 'true',
            message: "producto eliminado del carrito",
            cart
        });
    } catch (err) {
        next(err)
    }
}

const getCartByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const objectserolveCart = resolveCartIdentifier(req, res, false);
        const query = objectserolveCart?.type === "user" ? { user: objectserolveCart.id } : { anonId: objectserolveCart?.id };
        ;

        const cart = await Cart.findOne(query)
            .populate({
                path: 'products.product',
                select: 'productName price images',
                populate: {
                    path: 'images',
                    select: 'url',
                },
            })

        if (!cart) {
            throw new NotFoundError('carrito no encontrado')
        }

        res.status(200).json({ cart })
    } catch (err) {
        next(err)
    }
}

const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const objectserolveCart = resolveCartIdentifier(req, res, false);
        const query = objectserolveCart?.type === "user" ? { user: objectserolveCart.id } : { anonId: objectserolveCart?.id };


        const cart = await Cart.findOneAndUpdate(
            query,
            { $set: { products: [] } },
            { new: true }
        )


        if (!cart) {
            throw new NotFoundError('carrito no encontrado')
        }

        res.status(200).json({ cart })
    } catch (err) {
        next(err)
    }
}

const updateItemCuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params
        const { amount } = req.body

        if (!amount || amount < 1) {
            throw new BadRequest('cantidad invalida')
        }

        const objectserolveCart = resolveCartIdentifier(req, res, false);
        const query = objectserolveCart?.type === "user" ? { user: objectserolveCart.id } : { anonId: objectserolveCart?.id };

        const cart = await Cart.findOneAndUpdate(
            { ...query, 'products.product': new mongoose.Types.ObjectId(productId) },
            { $set: { 'products.$.amount': amount } },
            { new: true }
        ).populate({
            path: "products.product",
            select: "productName price images",
            populate: {
                path: "images",
                select: "url",
            },
        });

        if (!cart) {
            throw new NotFoundError('Producto no encontrado en el carrito')
        }

        res.status(200).json({
            success: true,
            message: 'cantidad actualizada',
            cart
        })
    } catch (err) {
        next(err)
    }
}

export {
    addItemToCart,
    removeItemFromCart,
    getCartByUserId,
    clearCart,
    updateItemCuantity
}