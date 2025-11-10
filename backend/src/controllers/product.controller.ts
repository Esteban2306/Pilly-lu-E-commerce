import { Product } from "../models/product.js";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../middlewares/not-found.js";
import { Image } from "../models/image.js";
import mongoose from "mongoose";
import { Category } from "../models/category.js";
import { calculateDiscountedPrice } from "../utils/calculateDiscountedPrice.js";

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
            isFeatured,
        } = req.body;

        if (!productName || !description || !price || !category) {
            return res.status(400).json({ error: "Campos requeridos faltantes" });
        }

        const parsedOffer =
            typeof offer === "string" && !isNaN(Number(offer))
                ? Number(offer)
                : offer;

        const { finalPrice } = calculateDiscountedPrice(price, parsedOffer);

        const product = new Product({
            productName,
            description,
            color,
            material,
            price,
            finalPrice,
            offer,
            status,
            category,
            stock,
            sku,
            isFeatured,
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


        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
                .populate("category", "categoryName")
                .sort(sortOptions)
                .skip(skip)
                .limit(limit),
            Product.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(totalProducts / limit)

        res.status(200).json({
            totalProducts,
            totalPages,
            currentPage: page,
            limit,
            products,
        });
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


const getRelatedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate("category");
        if (!product) throw new NotFoundError("Producto no encontrado");

        const relatedProducts = await Product.find({
            category: product.category?._id,
            _id: { $ne: product._id },
        })
            .select("productName price finalPrice images color offer stock")
            .limit(6)
            .populate("images", "url");

        res.status(200).json({
            message: "Productos relacionados encontrados con éxito.",
            relatedProducts,
        });

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


const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { price, offer } = req.body;
        let updatedData = { ...req.body };

        if (price !== undefined && offer !== undefined) {
            const { finalPrice } = calculateDiscountedPrice(price, offer);
            updatedData = { ...updatedData, finalPrice };
        }

        const data = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
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

const updateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { url, alt, isMain } = req.body;

        const updated = await Image.findByIdAndUpdate(
            id,
            { url, alt, isMain },
            { new: true }
        );

        if (!updated) {
            throw new NotFoundError("Imagen no encontrada");
        }

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

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

const addImagesToProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { images } = req.body;

        const product = await Product.findById(id)
        if (!product) {
            throw new NotFoundError('producto no encontrado')
        }

        const newImageDocs = await Image.insertMany(
            images.map((img: any) => ({
                url: img.url,
                alt: img.alt ?? "",
                isMain: Boolean(img.isMain),
                product: product._id,
            }))
        );

        product.images.push(...newImageDocs.map((i: any) => i._id))
        await product.save()

        res.status(201).json({
            message: 'imagen creada con exito',
            newImageDocs
        })
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
    toggleFeatured,
    updateImage,
    addImagesToProduct,
    getRelatedProducts
}