import { Category } from "./productsCategory.types";

export type ProductCardProps = {
    _id: string;
    productName: string;
    price: number;
    images: { url: string }[];
    category: string | Category | null;
    sku?: string;
    description?: string
}   