import mongoose from "mongoose";

const imageShema = new mongoose.Schema({
    url: {
        type: String,
        require: true,
    },

    alt: {
        type: String,
    },

    isMain: {
        type: Boolean,
        default: false
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true });

export const Image = mongoose.model('Image', imageShema)