import mongoose, { Schema } from "mongoose";
import { OrderTypeGeneral } from "../types/order.type.js";

const orderSchema = new Schema<OrderTypeGeneral>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                amount: { type: Number, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        subtotal: { type: Number, required: true, default: 0 },
        total: { type: Number, required: true, default: 0 },
        totalDiscount: { type: Number, required: true, default: 0 },
        status: {
            type: String,
            enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado", "procesando"],
            default: "pendiente",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model<OrderTypeGeneral>("Order", orderSchema);