import { Product } from "./productsCategory.types";

export interface PaginatedResponse<T> {
    products: T[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
}