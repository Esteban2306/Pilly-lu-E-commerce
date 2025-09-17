import { User } from "../models/users";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found";
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Role } from "../models/role";

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

const createRol = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body

        const createspecificrole = await Role.create({ name })

        res.status(200).json(createspecificrole)
    } catch (err) {
        next(err)
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

        const defaultRole = await Role.findOne({ name: 'lectura' })
        if (!defaultRole) {
            throw new NotFoundError('rol no encontrado en la db')
        }

        const data = await User.create({ firstName, lastName, email, password: hashPassword, role: defaultRole._id })
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
            { sub: user._id, role: user.role?.toString() },
            jwtSecret,
            { expiresIn: '7d' }
        )
        res.json({
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });


    } catch (err) {
        next(err);
    }

}

export {
    getUserById, registerUSer, loginUser, createRol
}