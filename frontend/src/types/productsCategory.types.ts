export type Category = {
    _id: string;
    categoryName: string;
}

export type Product = {
    _id: string;
    productName: string;
    description?: string;
    price: number;
    color: string;
    offer: string;
    status: string;
    images: { url: string }[];
    category: Category | null | undefined;
    sku?: string;
    amount?: number;
    subtotal?: number;
    stock?: number;
    isFeatured?: boolean;
}