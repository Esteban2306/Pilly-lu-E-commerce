'use client'

import { createContext, useState, useContext, useEffect } from "react"
import { cartApi } from "@/services/CartApi"
import { Cart, CartProduct } from "@/types/cart.types"
import { CartContextType } from "./types"


const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [product, setProduct] = useState<CartProduct[] | null>(null)

    useEffect(() => {
        cartApi.getCartByUserId().then((res) => { console.log(res); setCart(res); setProduct(res.products) })
    }, [])

    const addCart = async (productId: string, amount: number) => {
        const res = await cartApi.addItemToCart(productId, amount)
        setCart(res.cart)
        setProduct(res.cart.products)
    }

    const removeItem = async (productId: string) => {
        const res = await cartApi.removeItemFromCart(productId)
        setCart(res.cart)
        setProduct(res.cart.products)
    }

    const clearCart = async () => {
        const res = await cartApi.clearCart()
        setCart(res)
        setProduct(res.products)
    }

    return (
        <CartContext.Provider value={{ cart, product, addToCart: addCart, removeCart: removeItem, clearCart }}>
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

