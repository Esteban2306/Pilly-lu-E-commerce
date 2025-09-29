import mongoose, { Schema } from "mongoose";


const orderShema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },

        amount: {
            type: Number,
            default: 1
        },

        price: {
            type: Number,
            require: true
        }
    }],

    total: {
        type: Number,
        require: true
    },


    status: {
        type: String,
        enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
        default: "pendiente"
    }

}, { timestamps: true })

export const Order = mongoose.model('Order', orderShema)