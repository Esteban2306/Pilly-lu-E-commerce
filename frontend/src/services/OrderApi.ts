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
}

export const orderApi = new OrderApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});