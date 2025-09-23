import { LoginResponse } from "@/types/login.types"
import { Cart } from "@/types/cart.types"
import { Product } from "@/types/productsCategory.types"

export type AuthContextType = {
    user: LoginResponse['user'] | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

export interface CartContextType {
    cart: Cart | null;
    addToCart: (ProductId: string, amount: number | 1) => Promise<void>
    removeCart: (ProductId: string) => Promise<void>
    clearCart: () => Promise<void>
}

