import mongoose from "mongoose";

const categoryShema = new mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
        unique: true
    }
})

export const Category = mongoose.model('Category', categoryShema)