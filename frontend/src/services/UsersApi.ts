import { Api } from "./Api";

export class UsersApi extends Api {
    getUser<T>(id: string) {
        return this.request<T>(`users/${id}`, 'GET', true)
    }

    getAllUsers<T>() {
        return this.request<T>('users/', 'GET', true)
    }

    deleteUser<T>(id: string) {
        return this.request<T>(`users/${id}`, 'DELETE')
    }
}

export const userApi = new UsersApi({
    baseUrl: 'https://pilly-lu-e-commerce-production.up.railway.app',
    headers: { 'Content-Type': 'application/json' },
});