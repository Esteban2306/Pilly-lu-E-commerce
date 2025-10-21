import { Category } from "../models/category.js";
import { Request, Response, NextFunction } from "express";


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryName } = req.body

        const create = await Category.create({ categoryName })

        res.status(200).json(create)
    } catch (err) {
        next(err)
    }
}

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Category.find()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export {
    getCategory, createCategory
}