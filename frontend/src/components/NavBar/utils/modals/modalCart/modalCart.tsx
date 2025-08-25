import React from "react";
import CartItem from "./CartItem"
import productProof from '../../../../../../public/images/products/productProof.jpg'

const CartModal: React.FC = () => {
    // Por ahora, simulamos productos estáticos
    const mockProducts = [
        { title: "Manilla de oro 18k", price: "$140.000", image: productProof },
        { title: "Manilla de oro 18k", price: "$140.000", image: productProof },
        { title: "Manilla de oro 18k", price: "$140.000", image: productProof },
        { title: "Manilla de oro 18k", price: "$140.000", image: productProof },
        { title: "Manilla de oro 18k", price: "$140.000", image: productProof },
        { title: "Manilla de oro 18k", price: "$140.000", image: productProof },
    ];

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
                {mockProducts.map((p, i) => (
                    <CartItem key={i} {...p} />
                ))}
            </div>

            <button className="bg-secondary rounded-lg p-3 mt-4 h-10 text-[14px] font-medium hover:bg-blue-300">
                Consultar carrito en WhatsApp
            </button>
        </div>
    );
};

export default CartModal;