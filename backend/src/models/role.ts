import mongoose from "mongoose";

const roleShema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        default: 'lectura'
    }
}, { timestamps: true })

export const Role = mongoose.model('Role', roleShema)