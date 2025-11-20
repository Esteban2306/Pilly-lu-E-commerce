import { User } from "../models/users.js";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found.js";
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Role } from "../models/role.js";
import { mergeCarts } from "../utils/mergeCarts.js";
import BadRequest from "../middlewares/bad-request.js";

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

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, role, page = 1, limit = 10 } = req.query;

        const filter: any = {};

        if (role && role !== "all") filter["role.name"] = role;

        const skip = (Number(page) - 1) * Number(limit);

        const [users, total] = await Promise.all([
            User.find(filter)
                .populate("role", "name")
                .skip(skip)
                .limit(Number(limit))
                .exec(),
            User.countDocuments(filter),
        ]);

        if (!users.length) {
            throw new NotFoundError("No se encontraron usuarios");
        }

        const filtered = users.filter(u => {
            if (!search) return true;
            const text = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase();
            return text.includes((search as string).toLowerCase());
        });

        const formattedData = filtered.map(user => ({
            _id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            fullName: `${user.firstName} ${user.lastName}`,
        }));

        res.status(200).json({
            message: "Usuarios encontrados con éxito",
            data: formattedData,
            pagination: {
                total,
                totalPages: Math.ceil(total / Number(limit)),
                currentPage: Number(page),
                limit: Number(limit),
            },
        });
    } catch (err) {
        next(err);
    }
};

const delteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const data = await User.findById(id)

        if (!data) {
            throw new NotFoundError('usuario no encontrado')
        }

        await data.deleteOne()

        res.status(200).json({
            message: 'usuario eliminado con exito',
            data
        })
    } catch (err) {
        next(err)
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
        );

        if (req.cookies?.cartId) {
            await mergeCarts(user._id.toString(), req.cookies.cartId)
            res.clearCookie('cartId')
        }

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
    getUserById, registerUSer, loginUser, createRol, getAllUsers, delteUser
}