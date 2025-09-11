import { Api } from "./Api";

export class CartApi extends Api {

    addItemToCart<T>(data: Record<string, unknown>) {
        return this.request<T>('cart/add', 'POST', data, false)
    }

    removeItemFromCart<T>(data: Record<string, unknown>) {
        return this.request<T>('cart/remove', 'DELETE', data, false)
    }

    getCartByUserId<T>(id: string) {
        return this.request<T>(`cart/${id}`, 'GET', false)
    }

    clearCart<T>() {
        return this.request<T>('cart/clear', 'DELETE', false)
    }
}

export const cartApi = new CartApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});