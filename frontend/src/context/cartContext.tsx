'use client'

import { createContext, useState, useContext, useEffect, Children } from "react"
import { cartApi } from "@/services/CartApi"
import { Cart } from "@/types/cart.types"
import { CartContextType } from "./types"

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);

    useEffect(() => {
        cartApi.getCartByUserId().then((res) => setCart(res.cart))
    }, [])

    const addCart = async (productId: string, amount: number) => {
        const res = await cartApi.addItemToCart(productId, amount)
        setCart(res.cart)
    }

    const removeItem = async (productId: string) => {
        const res = await cartApi.removeItemFromCart(productId)
        setCart(res.cart)
    }

    const clearCart = async () => {
        const res = await cartApi.clearCart()
        setCart(res.cart)
    }

    return (
        <CartContext.Provider value={{ cart, addToCart: addCart, removeCart: removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (ctx === undefined) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return ctx;
}

