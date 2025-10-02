import { Api } from "./Api";

export class OrderApi extends Api {

    createOrder<T>(data: Record<string, unknown>) {
        return this.request<T>('order', 'POST', data, true)
    }

    getOrderByUser<T>(id: string) {
        return this.request<T>(`order/user/${id}`, 'GET', true)
    }

    getOrderById<T>(id: string) {
        return this.request<T>(`order/${id}`, 'GET', true)
    }

    cancelOrder<T>(id: string) {
        return this.request<T>(`order/${id}/cancel`, 'GET', true)
    }

    editAmountOrder<T>(orderId: string, productId: string, amount: number) {
        return this.request<T>(`order/${orderId}/product/${productId}`, 'PUT', { amount })
    }

    deleteProductOrder<T>(orderId: string, productId: string) {
        return this.request<T>(`order/${orderId}/product/${productId}`, 'DELETE')
    }
}

export const orderApi = new OrderApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});