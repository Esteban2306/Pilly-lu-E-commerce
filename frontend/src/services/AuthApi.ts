import { Api } from "./Api";
import { LoginResponse } from "@/types/login.types";

export class AuthApi extends Api {

    signIn(credentials: { email: string; password: string }) {
        return this.request<LoginResponse>('users/signIn', 'POST', credentials, false)
    }

    signUp<T>(data: { firstName: string; lastName: string; email: string; password: string }) {
        return this.request<T>('users/signUp', 'POST', data, false)
    }
}

export const authApi = new AuthApi({
    baseUrl: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json' },
});