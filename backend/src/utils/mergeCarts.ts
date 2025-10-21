import { Cart } from "../models/cart.js";
import mongoose from "mongoose";

export const mergeCarts = async (userId: string, anonId: string) => {
    const anonCart = await Cart.findOne({ anonId });
    const userCart = await Cart.findOne({ user: userId });

    if (!userCart && !anonCart) return [];

    if (!anonCart) return userCart;

    if (!userCart) {
        anonCart.user = new mongoose.Types.ObjectId(userId);
        anonCart.anonId = undefined;
        return await anonCart.save();
    }

    for (const item of anonCart.products) {
        const existing = userCart.products.find(
            (p) => p.product?.toString() === item.product?.toString()
        );
        if (existing) {
            existing.amount += item.amount;
        } else {
            userCart.products.push(item);
        }
    }

    await userCart.save();
    await anonCart.deleteOne();
    return userCart;
}