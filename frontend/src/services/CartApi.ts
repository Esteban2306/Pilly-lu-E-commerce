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
        return this.request<{ cart: Cart }>(`cart`, 'GET', true)
    }

    clearCart() {
        return this.request<{ cart: Cart }>('cart/clear', 'DELETE', false)
    }

    updateItemCuantity(productId: string, amount: number) {
        return this.request<{ cart: Cart }>(`cart/${productId}`, 'PUT', { amount })
    }
}

export const cartApi = new CartApi({
    baseUrl: 'https://pilly-lu-e-commerce-production.up.railway.app',
    headers: { 'Content-Type': 'application/json' },
});