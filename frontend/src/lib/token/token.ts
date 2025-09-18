const TOKEN_KEY = 'Token';

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}