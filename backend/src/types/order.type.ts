import { ProductType } from "./product.types"

export type OrderType = {
    _id: string;
    user: string;
    products: { product: ProductType }[];
    total: number;
    subtotal: number;
    amount: number;
    status: string;
}