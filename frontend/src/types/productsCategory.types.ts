export type Category = {
    _id: string;
    categoryName: string;
}

export type Product = {
    _id: string;
    productName: string;
    description: string;
    price: number;
    image: string;
    category: string | Category
}