'use client'
import { useCart } from "@/context/cartContext";

export default function ButtonAddItemToCart({ productId }: { productId: string }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(productId, 1)}
            className="mt-4 bg-secondary hover:bg-[#7CA6D3] text-black px-4 py-2 rounded cursor-pointer"
        >
            Agregar al carrito
        </button>
    )
}

