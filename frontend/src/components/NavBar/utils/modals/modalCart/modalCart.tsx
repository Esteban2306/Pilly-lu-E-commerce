"use client";
import React from "react";
import CartItem from "./CartItem";
import { useCart } from "@/context/cartContext";
import { orderApi } from "@/services/OrderApi";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type ModalCartProps = {
    trigger: React.ReactElement;
};

const ModalCart: React.FC<ModalCartProps> = ({ trigger }) => {
    const { cart, product, removeCart } = useCart();

    const handleConsultCart = async () => {
        try {
            const userId = cart?.user;
            const response = await orderApi.createOrder<{ order: any; whatsappLink: string }>({ userId });
            const resWhatsappLink = response.whatsappLink;
            window.open(resWhatsappLink, "_blank", "noopener,noreferrer");
        } catch (err) {
            console.error("Error creando orden: ", err);
        }
    };

    const safeTrigger = React.isValidElement(trigger) ? trigger : <span>{trigger}</span>;

    return (
        <Sheet>
            <SheetTrigger asChild>{safeTrigger}</SheetTrigger>

            <SheetContent side="right"
                className="
                bg-primary
                bg-gradient-to-r
                from-blue-200/50
                via-transparent
                to-blue-200/50
                backdrop-blur-3xl
                border-l-0
                rounded-l-lg
                ">
                <SheetHeader>
                    <SheetTitle className="text-3xl m-auto font-bold pt-2.5">Carrito</SheetTitle>
                    <SheetDescription className="text-gray-800 m-auto">Revisa tus productos antes de comprar.</SheetDescription>
                </SheetHeader>

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

                <SheetFooter className="flex gap-2 mb-5">

                    <button
                        onClick={handleConsultCart}
                        className="group relative overflow-hidden rounded-full bg-secondary px-8 py-4 text-lg transition-all">
                        <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-green-500/30 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
                        <span className="font-semibold text-black">Consultar carrito en WhatsApp</span>
                    </button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ModalCart;
