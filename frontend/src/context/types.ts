import { LoginResponse } from "@/types/login.types"

export type AuthContextType = {
    user: LoginResponse['user'] | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}