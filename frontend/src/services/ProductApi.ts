import { Api } from "./Api";

export class ProductApi extends Api {
    getAll<T>() {
        return this.request<T>('product', 'GET', false)
    }

    getById<T>(id: string) {
        return this.request<T>(`product/${id}`, 'GET', false)
    }

    getByCategory<T>(categoryId: string) {
        return this.request<T>(`product/category/${categoryId}`, 'GET', false)
    }

    getFeatured<T>() {
        return this.request<T>(`product/featured`, 'GET', false)
    }

    getImagesByProductId<T>(id: string) {
        return this.request<T>(`product/image/${id}`, 'GET', false)
    }

    create<T>(data: Record<string, unknown>) {
        return this.request<T>('product', 'POST', data, true)
    }

    update<T>(data: Record<string, unknown>, id: string) {
        return this.request<T>(`product/${id}`, 'PUT', data, true)
    }

    delete<T>(id: string) {
        return this.request<T>(`product/${id}`, 'DELETE')
    }


}

export const productApi = new ProductApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' }
})
