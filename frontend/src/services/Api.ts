import { getToken } from "@/lib/token/token";

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEADERS';

export interface ApiOptions {
    baseUrl: string
    headers?: Record<string, string>
}

export class Api {

    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(options: ApiOptions) {
        this.baseUrl = options.baseUrl
        this.headers = options.headers ?? {}
    }

    protected async request<T>(
        path: string,
        method: HttpMethod,
        data?: unknown,
        auth: boolean = true
    ): Promise<T> {
        try {
            const headers: Record<string, string> = {
                ...this.headers,
            };

            if (auth) {
                const token = getToken()
                headers.Authorization = `Bearer ${token}`;
            }

            const res = await fetch(`${this.baseUrl}/${path}`, {
                method,
                headers,
                body: method !== 'GET' ? JSON.stringify(data) : null,
            });

            return this.checkResponse<T>(res);
        } catch (err) {
            this.catchError(err);
            throw err;
        }
    }

    private async checkResponse<T>(res: Response): Promise<T> {
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`)
        };
        return res.json() as Promise<T>
    }

    private catchError(err: unknown): void {
        console.error('Api Error:', err)
    }
}