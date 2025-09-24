import { Product } from '@/types/productsCategory.types'
import { ProductCardProps } from './product.types';

export interface CartProduct {
    product: Product;
    amount: number;
}

export interface Cart {
    _id: string;
    user?: string;
    anonId?: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
}