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

    material: {
        type: String,
        require: true
    },

    offer: {
        type: Number,
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

    stock: {
        type: Number,
        default: 0
    },

    slug: {
        type: String,
        require: true,
        default: () => {
            return crypto
                .randomBytes(8)       // genera bytes aleatorios
                .toString("base64")        // convierte a base64
                .replace(/[^a-zA-Z0-9]/g, "") // elimina caracteres raros
                .substring(0, 8);     // corta al tamaño deseado
        },
        unique: true
    },

}, { timestamps: true })

export const Product = mongoose.model('Product', productShema)