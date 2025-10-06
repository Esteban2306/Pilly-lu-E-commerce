import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../middlewares/bad-request";
import NotFoundError from "../middlewares/not-found";
import { Image } from "../models/image";
import mongoose from "mongoose";
import { Category } from "../models/category";
import { machine } from "node:os";

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
            sku,
            isFeatured
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
            sku,
            isFeatured
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

const getImagesByProductId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const images = await Image.find({ product: id });
        if (!images || images.length === 0) {
            throw new NotFoundError('No se encontraron imágenes para este producto');
        }

        res.status(200).json(images);
    } catch (err) {
        next(err);
    }
}


const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { search, category, minPrice, maxPrice, sortBy } = req.query

        const filter: Record<string, any> = {}

        if (search) {
            filter.productName = { $regex: search, $options: 'i' }
        }

        if (category) {
            const foundCategory = await Category.findOne({
                categoryName: { $regex: category.toString(), $options: 'i' }
            })

            if (foundCategory) {
                filter.category = foundCategory._id;
            }
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let sortOptions = {};
        switch (sortBy) {
            case "price_asc":
                sortOptions = { price: 1 };
                break;
            case "price_desc":
                sortOptions = { price: -1 };
                break;
            case "newest":
                sortOptions = { createdAt: -1 };
                break;
            case "oldest":
                sortOptions = { createdAt: 1 };
                break;
            default:
                sortOptions = { createdAt: -1 };
        }

        const product = await Product.find(filter)
            .populate("category", "categoryName")
            .sort(sortOptions)

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

        let category = null;
        if (mongoose.Types.ObjectId.isValid(categoryId)) {
            category = await Category.findById(categoryId);
        }
        if (!category) {
            category = await Category.findOne({ slug: categoryId.toString().toLowerCase().trim() });
        }
        if (!category) {
            throw new NotFoundError('Categoría no encontrada');
        }

        const products = await Product.find({ category: category._id })
            .populate({
                path: 'images',
                select: 'url alt isMain'
            })
            .exec();

        if (!products || products.length === 0) {
            throw new NotFoundError('No se han encontrado productos para esta categoría');
        }

        res.status(200).json({ category, products });
    } catch (err) {
        next(err);
    }
};

const getProductsFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find({ isFeatured: true })

        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

const toggleFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            throw new NotFoundError("Producto no encontrado");
        }

        product.isFeatured = !product.isFeatured;
        await product.save();

        res.status(200).json({
            message: `El producto ahora está ${product.isFeatured ? "destacado" : "sin destacar"}`,
            isFeatured: product.isFeatured,
        });
    } catch (err) {
        next(err);
    }
};

const getRelatedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id).populate('category')
        if (!product) {
            throw new NotFoundError('producto no encontrado')
        }

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
        ).populate("category", "categoryName")
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
    deleteProduct,
    getProductsFeatured,
    getImagesByProductId,
    toggleFeatured
}