import { Api } from "./Api";
import { Cart } from "@/types/cart.types";

export class CartApi extends Api {

    addItemToCart(productId: string, amount: number) {
        return this.request<{ cart: Cart }>('cart/add', 'POST', { productId, amount }, true)
    }

    removeItemFromCart(productId: string) {
        return this.request<{ cart: Cart }>(`cart/${productId}/remove`, 'DELETE')
    }

    getCartByUserId() {
        return this.request<Cart>(`cart`, 'GET', true)
    }

    clearCart() {
        return this.request<Cart>('cart/clear', 'DELETE', false)
    }
}

export const cartApi = new CartApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});