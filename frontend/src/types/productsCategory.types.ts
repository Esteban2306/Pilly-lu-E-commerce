export type Category = {
    _id: string;
    categoryName: string;
}

export type Product = {
    _id: string;
    productName: string;
    description: string;
    price: number;
    images: { url: string }[];
    category: string | Category
}