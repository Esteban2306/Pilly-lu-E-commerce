import { Category } from "./productsCategory.types";

export type ProductCardProps = {
    _id: string;
    productName: string;
    price: number;
    images: { url: string }[];
    category?: Category | null;
    sku?: string;
    description?: string;
    isFeatured?: boolean;
    color: string;
    offer: number | string;
    stock?: number;
    status?: string;
};