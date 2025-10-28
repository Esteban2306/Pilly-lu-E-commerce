import { Api } from "./Api";

export class OrderApi extends Api {

    createOrder<T>(data: Record<string, unknown>) {
        return this.request<T>('order', 'POST', data, true)
    }

    getOrder<T>(queryParams?: string) {
        const url = queryParams && queryParams.trim().length > 0
            ? `order?${queryParams}`
            : "order";

        return this.request<T>(url, "GET", true);
    }

    getOrderById<T>(id: string) {
        return this.request<T>(`order/${id}`, 'GET', true)
    }

    getOrdersByUserId<T>(userId: string) {
        return this.request<T>(`order/user/${userId}`, 'GET', true)
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

    deleteOrder<T>(orderId: string) {
        return this.request<T>(`order/${orderId}`, 'DELETE')
    }

    updateOrder<T>(data: Record<string, unknown>, orderId: string) {
        return this.request<T>(`order/${orderId}`, 'PUT', data)
    }
}

export const orderApi = new OrderApi({
    baseUrl: 'https://api.pillylu.qzz.io',
    headers: { 'Content-Type': 'application/json' },
});