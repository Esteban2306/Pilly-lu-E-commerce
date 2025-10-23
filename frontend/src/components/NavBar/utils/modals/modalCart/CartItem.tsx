'use client'

import React from "react";
import Image from "next/image";
import { Counter } from '@/components/ui/shadcn-io/counter';
import { useCart } from "@/context/cartContext";

interface CartItemProps {
    productId: string
    title: string;
    price: number;
    image: string;
    amount: number
}

const CartItem: React.FC<CartItemProps> = ({ productId, title, price, image, amount }) => {
    const { updateCart, removeCart } = useCart()

    return (
        <div
            className="flex items-center justify-between gap-3 py-2 
      bg-gradient-to-r from-blue-200/50 via-transparent to-blue-200/50
      backdrop-blur-2xl m-3 rounded-2xl p-3"
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <Image
                    src={image}
                    alt={title}
                    width={44}
                    height={44}
                    className="rounded-md object-cover size-11"
                />
                <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{title}</p>
                    <p className="text-sm text-gray-600">${price}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Counter number={amount} setNumber={(newAmount) => updateCart(productId, newAmount)} />
                <button
                    onClick={() => removeCart(productId)}
                    className="text-black font-bold hover:text-red-500 cursor-pointer transition-transform duration-200 hover:rotate-90"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default CartItem;
