import { OrderPageClient } from "@/components/orderPage/orderPageClient"

export default function OrderPage({ params }: { params: { id: string } }) {
    const { id } = params

    return <OrderPageClient orderId={id} />

} 