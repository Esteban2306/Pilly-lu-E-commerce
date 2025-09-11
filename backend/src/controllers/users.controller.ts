import { User } from "../models/users";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found";
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || 'some-secret-key'


const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.findById(req.params.id)
        if (data) {
            return res.json(data)
        } else {
            throw new NotFoundError('error al encontrar usuario')
        }
    } catch (err) {
        next(err);
    }
}

const registerUSer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'El email ya está registrado'
            });
        }

        const hashPassword = await bycript.hash(password, 10);
        const data = await User.create({ firstName, lastName, email, password: hashPassword })
        res.json(data)
        return
    } catch (err) {
        next(err)
    }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFoundError('usuario no encontrado')
        }

        const isMatch = await bycript.compare(password, user.password!)
        if (!isMatch) {
            return res.status(401).json({ message: 'credenciales invalidas' })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            jwtSecret,
            { expiresIn: '7d' }
        )

        res.json({
            message: "Login exitoso",
            token
        });


    } catch (err) {
        next(err);
    }

}

export {
    getUserById, registerUSer, loginUser
}