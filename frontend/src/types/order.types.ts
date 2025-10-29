import { Product } from "./productsCategory.types"

export type OrderType = {
    _id: string
    user: string
    products: { product: Product; amount: number }[]
    subtotal: number
    total: number
    totalDiscount: number
    amount: number
    status: string
    createAt: string
    whatsappLink: string
}

export type OrderRow = {
    _id: string
    user: string
    total: number | string
    status: string
    updateAt?: string
    createdAt: string
}