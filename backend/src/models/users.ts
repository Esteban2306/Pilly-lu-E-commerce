import mongoose from "mongoose";
import validator from 'validator'

const usersShema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 30,
        require: true,
    },

    lastName: {
        type: String,
        minlength: 2,
        maxlength: 30,
        require: true,
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },

    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (v: string) {
                return validator.isEmail(v);
            },
            message: 'Email must be valid'
        }
    },

    password: {
        type: String,
        require: true,
        minlength: 8,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})


export const User = mongoose.model("User", usersShema);