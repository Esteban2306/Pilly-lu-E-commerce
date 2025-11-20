import { Api } from "./Api";

export class UsersApi extends Api {
    getUser<T>(id: string) {
        return this.request<T>(`users/${id}`, 'GET', true)
    }

    getAllUsers<T>(page = 1, limit = 10) {
        return this.request<T>(`users?page=${page}&limit=${limit}`, 'GET', true)
    }

    deleteUser<T>(id: string) {
        return this.request<T>(`users/${id}`, 'DELETE')
    }
}

export const userApi = new UsersApi({
    baseUrl: 'https://api.pillylu.qzz.io',
    headers: { 'Content-Type': 'application/json' },
});