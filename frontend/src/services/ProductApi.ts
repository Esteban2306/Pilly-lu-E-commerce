import { Api } from "./Api";

export class ProductApi extends Api {
    getAll<T>(query?: string) {
        return this.request<T>(`product${query ? query : ''}`, 'GET', false)
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

    addImages<T>(id: string, images: { url: string; isMain?: boolean }[]) {
        return this.request<T>(`product/${id}/images`, 'POST', { images }, true);
    }

    update<T>(id: string, data: Record<string, unknown>) {
        return this.request<T>(`product/${id}`, 'PUT', data, true)
    }

    delete<T>(id: string) {
        return this.request<T>(`product/${id}`, 'DELETE')
    }

    toggleFeatured<T>(id: string) {
        return this.request<T>(`product/${id}/toggleFeatured`, 'PATCH')
    }

    updateImages<T>(data: Record<string, unknown>, id: string) {
        return this.request<T>(`product/images/${id}`, 'PUT', data, true)
    }


}

export const productApi = new ProductApi({
    baseUrl: 'https://api.pillylu.qzz.io',
    headers: { 'Content-Type': 'application/json' }
})
