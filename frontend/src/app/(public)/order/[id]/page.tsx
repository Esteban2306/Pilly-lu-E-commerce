import { OrderPageClient } from "@/components/orderPage/orderPageClient"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: PageProps) {
    const { id } = await params
    return <OrderPageClient orderId={id} />
}