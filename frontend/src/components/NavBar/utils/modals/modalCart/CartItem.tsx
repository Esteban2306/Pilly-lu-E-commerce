import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface CartItemProps {
    title: string;
    price: number;
    image: string;
    onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ title, price, image, onRemove }) => {
    return (
        <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex items-center gap-3">
                <Image
                    src={image}
                    alt={title}
                    width={44}
                    height={44}
                    className="rounded-md object-cover size-11"
                />
                <div>
                    <p className="text-sm font-medium truncate max-w-[140px]">{title}</p>
                    <p className="text-sm text-gray-600">{price}</p>
                </div>
            </div>
            <button
                onClick={onRemove}
                className="text-black font-bold mr-2 hover:text-red-500 cursor-pointer hover:animate-rotate-180 hover:animate-duration-400" >
                ✕
            </button>
        </div>
    );
};

export default CartItem;
