import mongoose from "mongoose";
import crypto from 'crypto'

const productShema = new mongoose.Schema({

    productName: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    color: {
        type: String,
        require: true
    },

    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],

    price: {
        type: Number,
        require: true
    },

    finalPrice: {
        type: Number,
        default: 0
    },

    material: {
        type: String,
        require: true
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
        require: true,
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