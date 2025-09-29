import { Product } from "./productsCategory.types"

export type OrderType = {
    _id: string;
    user: string;
    products: { product: Product }[];
    total: number;
    subtotal: number;
    amount: number;
    status: string;
    createAt: string;
    whatsappLink: string;
}