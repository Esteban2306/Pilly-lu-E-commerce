export type CategoryType = {
    _id: string;
    categoryName: string;
}


export type ProductType = {
    _id: string;
    productName: string;
    description: string;
    price: number;
    images: { url: string }[];
    category: string | CategoryType;
    sku: string;
    amount: number;
    stock: number;
}