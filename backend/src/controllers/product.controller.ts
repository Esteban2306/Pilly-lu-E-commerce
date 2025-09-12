import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../middlewares/bad-request";
import NotFoundError from "../middlewares/not-found";
import { Image } from "../models/image";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            productName,
            description,
            color,
            material,
            price,
            offer,
            status,
            category,
            stock,
            images,
        } = req.body;

        if (!productName || !description || !price || !category) {
            return res.status(400).json({ error: "Campos requeridos faltantes" });
        }
        const product = new Product({
            productName,
            description,
            color,
            material,
            price,
            offer,
            status,
            category,
            stock,
        });

        await product.save();

        if (Array.isArray(images) && images.length > 0) {
            const imageDocs = await Image.insertMany(
                images.map((img: any) => ({
                    url: img.url,
                    alt: img.alt ?? "",
                    isMain: Boolean(img.isMain),
                    product: product._id,
                }))
            );

            product.images = imageDocs.map((d: any) => d._id);
            await product.save();
        }

        return res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};


const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}

const getProductsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Product.findById(req.params.id)
        if (data) {
            res.status(200).json(data)
        } else {
            throw new NotFoundError('usuario no encontrado')
        }

    } catch (err) {
        next(err)
    }
}

const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const products = await Product.find({ category: categoryId })
            .exec //exec me permite devolver una promise pura aunque await ya lo hace me ayua a evitar posibles errores

        if (!products || products.length == 0) {
            throw new NotFoundError('no se han encontrado productos para esta categoria')
        }
        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!data) {
            throw new NotFoundError('producto no encontrado')
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new NotFoundError('ID de producto no encontrado')
        }
        await product.deleteOne()
        res.status(202).json({ message: 'producto eliminado correctamente' })
    } catch (err) {
        next(err)
    }
}


export {
    createProduct,
    getProducts,
    getProductsById,
    getProductByCategory,
    updateProduct,
    deleteProduct
}