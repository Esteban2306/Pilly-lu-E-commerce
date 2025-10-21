import { Api } from "./Api";

export class CategoryApi extends Api {
    getCategory<T>() {
        return this.request<T>('category', 'GET', false)
    }
}

export const categoryApi = new CategoryApi({
    baseUrl: 'https://pilly-lu-e-commerce-production.up.railway.app',
    headers: { 'Content-Type': 'application/json' },
});