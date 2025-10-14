import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        sparse: true,
    }
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);