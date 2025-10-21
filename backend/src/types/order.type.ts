import { ProductType } from "./product.types.js"
import { Document, Types } from "mongoose";
import { User } from "../models/users.js";

export type OrderType = {
    _id: string;
    user: string;
    products: { product: ProductType }[];
    total: number;
    subtotal: number;
    amount: number;
    status: string;
}

export interface OrderTypeGeneral extends Document {
    user: Types.ObjectId | {
        _id: string;
        firstName: string;
        lastName: string;
    };
    products: {
        product: Types.ObjectId;
        amount: number;
        price: number;
    }[];
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}