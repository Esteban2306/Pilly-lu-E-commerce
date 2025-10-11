import mongoose, { Schema } from "mongoose";
import { OrderTypeGeneral } from "../types/order.type";

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
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado", "procesando"],
            default: "pendiente",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model<OrderTypeGeneral>("Order", orderSchema);