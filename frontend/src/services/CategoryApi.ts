import { Api } from "./Api";

export class CategoryApi extends Api {
    getCategory<T>() {
        return this.request<T>('category', 'GET', false)
    }
}

export const categoryApi = new CategoryApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});