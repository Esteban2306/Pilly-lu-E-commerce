import { Api } from "./Api";

export class UsersApi extends Api {
    getUser<T>(id: string) {
        return this.request<T>(`users/${id}`, 'GET', true)
    }
}

export const userApi = new UsersApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});