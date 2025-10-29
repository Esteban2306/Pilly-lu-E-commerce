'use client'

import { orderApi } from "@/services/OrderApi"
import { OrderType } from "@/types/order.types"
import { ProjectCards } from "@/components/ui/animated-project-cards"
import { Props } from "./types"
import { useQuery } from "@tanstack/react-query"
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat/useCurrencyFormat"

export function OrderPageClient({ orderId }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
            const { order } = await orderApi.getOrderById<{ order: OrderType }>(orderId)
            return order
        },
        refetchOnWindowFocus: false,
    })

    const { formatCurrency } = useCurrencyFormat()

    if (isLoading) return <p>Cargando...</p>
    if (isError || !data) return <p>No se encontró la orden</p>

    const projects = data?.products.map((item) => ({
        id: item.product._id,
        title: item.product.productName || "Sin nombre",
        pricePerHour: formatCurrency((item.product.finalPrice || 0) * (item.product.amount || 1)),
        categories: [item.product.sku || "Sin SKU"],
        description: `Cantidad: ${item.product.amount ?? 1}`,
        logoColor: "bg-gray-200",
        logoIcon: item.product.images?.[0]?.url || "",
    }))
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-30">
            <div className="border-b pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Summary</h1>
                <p className="text-sm text-gray-500">Order ID: {data._id}</p>
                <p className="text-sm text-gray-500"> Estadode la orden: {data.status}</p>
            </div>

            <div className="space-y-4">
                <ProjectCards projects={projects} orderId={data._id} />
            </div>

            <div className="mt-8 border-t pt-6">
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                    <span>Subtotal</span>
                    <span>{formatCurrency(data.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm mb-2">
                    <span>Descuento</span>
                    <span>-{formatCurrency(data.totalDiscount || 0)}</span>
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
                    <span>{formatCurrency(data.total || 0)}</span>
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