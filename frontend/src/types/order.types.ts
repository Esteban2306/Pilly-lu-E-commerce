import { Product } from "./productsCategory.types"

export type OrderType = {
    _id: string;
    user: string;
    products: { product: Product }[];
    total: number | string;
    subtotal: number;
    amount: number;
    status: string;
    createAt: string;
    whatsappLink: string;
}

export type OrderRow = {
    _id: string
    user: string
    total: number | string
    status: string
    updateAt?: string
    createdAt: string
}