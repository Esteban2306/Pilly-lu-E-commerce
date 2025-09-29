'use client'
import React from "react";
import CartItem from "./CartItem"
import productProof from '../../../../../../public/images/products/productProof.jpg'
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { orderApi } from "@/services/OrderApi";
import { redirect } from "next/navigation";

const CartModal: React.FC = () => {

    const { cart, product, removeCart } = useCart()
    const router = useRouter()

    console.log('carrito', cart)
    console.log('producto', product)

    const handleConsultCart = async () => {
        try {
            const userId = cart?.user;
            const response = await orderApi.createOrder<{ order: any, whatsappLink: string }>({ userId });
            const orderId = response.order._id;
            const resWhatsappLink = response.whatsappLink

            console.log(resWhatsappLink)
            //redirect(resWhatsappLink)
            window.location.href = resWhatsappLink
        } catch (err) {
            console.error('Error creando orden: ', err)
        }
    }
    return (
        <div className="
                animate-fade-in
                animate-duration-200
                fixed 
                right-2 
                top-20 
                h-80 
                w-65 
                 bg-primary/30
                bg-gradient-to-r
                from-blue-200/50
                via-transparent
                to-blue-200/50
                backdrop-blur-md
                shadow-lg 
                rounded-b-lg 
                p-4 
                flex 
                flex-col">
            <h2 className="text-2xl font-semibold mb-2 text-center">Carrito</h2>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {product?.map((p, i) => (
                    <CartItem
                        key={i}
                        title={p.product.productName}
                        price={p.product.price}
                        image={p.product?.images?.[0]?.url}
                        onRemove={() => removeCart(p.product._id)}
                    />
                ))}
            </div>

            <button
                onClick={handleConsultCart}
                className="bg-secondary rounded-lg p-3 mt-4 h-10 text-[14px] font-medium hover:bg-blue-300"
            >
                Consultar carrito en WhatsApp
            </button>
        </div>
    );
};

export default CartModal;