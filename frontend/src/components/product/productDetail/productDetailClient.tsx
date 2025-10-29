'use client'

import ProductGallery from "@/components/product/productGallery/productGallery";
import ButtonDescriptionProduct from "@/components/buttons/buttonDescriptionProduct/buttonDescriptionProduct";
import ColageProcut from "@/components/product/collageProduct/collageProduct";
import ButtonAddItemToCart from "@/components/buttons/buttonAddItemToCart/buttonAddItemtoCart";
import { Props } from "./types";
import { useState } from "react";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat/useCurrencyFormat";
import { Counter } from "@/components/ui/shadcn-io/counter";
import ButtonAddToCartDetail from "@/components/buttons/buttonAddToCartDetail/ButtonAddToCartDetail";
import { useCart } from "@/context/cartContext";
import { orderApi } from "@/services/OrderApi";
import { OrderType } from "@/types/order.types";
import { useAuth } from "@/context/authContext";
import AnonUserModal from "@/components/orderPage/anonUserModal/AnonUserModal";

export default function ProductDetailClient({ product, productRecommended }: Props) {
    const { formatCurrency } = useCurrencyFormat();
    const { cart } = useCart();
    const { user } = useAuth();

    const [count, setCount] = useState(1);
    const [showAnonModal, setShowAnonModal] = useState(false);

    const handleConsultCart = async () => {
        try {
            const userId = cart?.user;
            const response = await orderApi.createOrder<{ order: OrderType; whatsappLink: string }>({ userId });
            const resWhatsappLink = response.whatsappLink;
            window.open(resWhatsappLink, "_blank", "noopener,noreferrer");
        } catch (err) {
            console.error("Error creando orden: ", err);
        }
    };

    const handleConsultClick = () => {
        if (!user) {
            setShowAnonModal(true);
        } else {
            handleConsultCart();
        }
    };

    return (
        <>
            <section className="max-w-6xl mx-auto px-6 py-12 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    <ColageProcut id={product._id} />

                    <div className="space-y-6 bg-white rounded-2xl">
                        <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
                            {product?.productName}
                        </h1>

                        <section className="flex items-baseline gap-3 border bg-gray-50 border-gray-200 rounded-2xl p-3 justify-between">
                            <div>
                                <span className="text-3xl font-bold text-gray-900 mr-3">
                                    {product.finalPrice
                                        ? formatCurrency(product.finalPrice)
                                        : formatCurrency(product.price)}
                                </span>
                                {product.finalPrice && (
                                    <span className="text-gray-400 line-through font-medium text-lg">
                                        {formatCurrency(product.price)}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">Impuesto incluido</p>
                        </section>

                        <section className="border bg-gray-50 border-gray-200 rounded-2xl p-3 space-y-4">
                            <p className="font-medium text-gray-700">
                                Color: <span className="font-semibold text-gray-800">{product.color || "Gold"}</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2 items-center border-t pt-4 m-0">
                                <span className="text-gray-400">Cantidad</span>
                                <Counter number={count} setNumber={setCount} />
                            </div>

                            <div className="flex items-center text-gray-700">
                                <span className="font-medium">Productos en stock:</span>
                                <span className="font-bold ml-2">{product.stock}</span>
                            </div>
                        </section>

                        <section className="border bg-gray-50 border-gray-200 rounded-2xl p-3 space-y-4">
                            <div>
                                <ButtonDescriptionProduct description={product.description} />
                            </div>
                        </section>

                        <section className="border bg-gray-50 border-gray-200 rounded-2xl p-3 space-y-4">

                            <h3 className="font-semibold text-gray-800 mb-1">Tiempo de entrega</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                2–5 días hábiles a todo el país. Empaque para regalo incluido.
                            </p>

                        </section>

                        <section className="border bg-gray-50 border-gray-200 rounded-2xl p-3 space-y-4">
                            <div className="flex flex-col justify-evenly sm:flex-row gap-3">
                                <ButtonAddItemToCart productId={product._id} amount={count} />
                                <ButtonAddToCartDetail
                                    onClick={handleConsultClick}
                                    firstText="Consultar por whatsapp"
                                    secondText="Pide ya"
                                    className="rounded-lg cursor-pointer"
                                    firstClass="bg-green-200 text-[16px] rounded-4xl font-bold h-full w-full "
                                    secondClass="bg-green-400 text-black text-[16px] rounded-4xl font-bold"
                                />
                            </div>
                        </section>

                        <div className="grid grid-cols-2  sm:grid-cols-3 gap-3 text-sm text-gray-700 border-t mt-4 pt-4">
                            <div>
                                <span className="font-semibold">Material:</span>
                                <p>{product.material || "Oro 12Q"}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Garantía:</span>
                                <p>{product.guarantee || "6 meses"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="
        grid justify-center gap-6 mt-20
        [grid-template-columns:repeat(1,280px)]
        sm:[grid-template-columns:repeat(2,280px)]
        lg:[grid-template-columns:repeat(3,280px)]
      "
                >
                    {productRecommended?.map((p) => (
                        <ProductGallery
                            key={p._id}
                            _id={p._id}
                            productName={p.productName}
                            price={p.price}
                            images={p.images}
                            color={p.color}
                            finalPrice={p.finalPrice ?? 0}
                            offer={p.offer}
                            stock={p.stock}
                        />
                    ))}
                </div>
            </section>
            {showAnonModal && <AnonUserModal onClose={() => setShowAnonModal(false)} />}
        </>
    );
}
