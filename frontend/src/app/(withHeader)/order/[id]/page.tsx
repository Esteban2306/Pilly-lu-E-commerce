import { orderApi } from "@/services/OrderApi"
import { OrderType } from "@/types/order.types"

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { order } = await orderApi.getOrderById<{ order: OrderType }>(id)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-30">
            <div className="border-b pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Summary</h1>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
            </div>

            <div className="space-y-4">
                {order.products.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-xl"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.product.images[0]?.url}
                                className="w-16 h-16 rounded-lg object-cover"
                                alt={item.product.productName}
                            />
                            <div>
                                <h2 className="text-gray-800 font-medium">
                                    {item.product.productName}
                                </h2>
                                <p className="text-sm text-gray-500">Qty: {item.product.amount}</p>
                                <p className="text-[12px] text-gray-500">
                                    SKU: {item.product.sku}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-800 font-semibold">
                            ${item.product.price * item.product.amount}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t pt-6">
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                    <span>Subtotal</span>
                    <span>${order.total}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                    <span>Descuento</span>
                    <span>-</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                    <span>Impuesto</span>
                    <span>$00.00</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                    <span>Envio</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 mt-4">
                    <span>Total</span>
                    <span>${order.total}</span>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Copiar link de orden
                </button>
            </div>
        </div>
    )
} 