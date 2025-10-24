// @ts-nocheck

import { OrderPageClient } from "@/components/orderPage/OrderPageClient"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: PageProps) {
    const { id } = await params
    return <OrderPageClient orderId={id} />
}