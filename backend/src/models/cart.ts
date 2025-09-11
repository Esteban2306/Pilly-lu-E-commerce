import mongoose, { Schema } from "mongoose";


const cartShema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },

    anonId: {
        type: String,
        require: false
    },

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },

        amount: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true })

export const Cart = mongoose.model('Cart', cartShema)