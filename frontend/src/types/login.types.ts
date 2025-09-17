export interface LoginResponse {
    message: string;
    token: string
    user: {
        id: string;
        email: string;
        role: string
        firstName: string;
        lastName: string
    };
}