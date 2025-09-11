import { Category } from "../models/category";
import { Request, Response, NextFunction } from "express";


const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Category.find()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export {
    getCategory
}