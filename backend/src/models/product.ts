import mongoose from "mongoose";
import crypto from 'crypto'

const productShema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],

    price: {
        type: Number,
        required: true
    },

    finalPrice: {
        type: Number,
        required: true
    },

    material: {
        type: String,
        required: true
    },

    offer: {
        type: mongoose.Schema.Types.Mixed,
        default: 0
    },

    status: {
        type: String,
        default: 'Publicar'

    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    stock: {
        type: Number,
        default: 0
    },

    sku: {
        type: String,
        required: true,
        default: () => {
            return crypto
                .randomBytes(8)
                .toString("base64")
                .replace(/[^a-zA-Z0-9]/g, "")
                .substring(0, 8);
        },
        unique: true
    },

}, { timestamps: true })

export const Product = mongoose.model('Product', productShema)