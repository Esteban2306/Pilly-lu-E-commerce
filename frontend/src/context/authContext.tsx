'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { getToken, setToken, removeToken } from "@/lib/token/token"
import { authApi } from "@/services/AuthApi"
import { AuthContextType } from './types'
import { LoginResponse } from "@/types/login.types"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginResponse["user"] | null>(null);
    const [token, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = getToken();
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setAuthToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        const res = await authApi.signIn({ email, password });
        setToken(res.token);
        setAuthToken(res.token);
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
    };

    const logout = () => {
        removeToken();
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};