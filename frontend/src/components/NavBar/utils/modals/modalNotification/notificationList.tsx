"use client";
import Image from "next/image";
import Link from "next/link";
import { Order } from "@/hooks/useOrders/types";

export default function NotificationList({ orders = [], isLoading }: { orders: Order[]; isLoading: boolean }) {
    if (isLoading)
        return <p className="text-center text-sm text-gray-500">Cargando...</p>;

    if (!orders.length)
        return <p className="text-center text-sm text-gray-500">No tienes órdenes todavía</p>;

    return (
        <ul className="space-y-3">
            {orders.map((order) => (
                <li
                    key={order._id}
                    className="p-3 bg-white/70 dark:bg-zinc-700/50 rounded-lg border border-zinc-200/30 dark:border-zinc-700/30 shadow-sm hover:shadow-md transition"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            #{order._id.slice(-6)}
                        </span>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full capitalize ${order.status === "pendiente"
                                ? "bg-yellow-100 text-yellow-600"
                                : order.status === "enviado"
                                    ? "bg-blue-100 text-blue-600"
                                    : order.status === "entregado"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-none">
                        {order.products.map((p, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center">
                                {p.images && p.images.length > 0 && p.images[0]?.url ? (
                                    <Image
                                        src={p.images[0].url}
                                        alt={p.productName || "Producto"}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="w-[50px] h-[50px] bg-gray-200 dark:bg-gray-600 rounded-md" />
                                )}
                                <p className="text-[11px] truncate max-w-[60px] text-center">
                                    {p.productName}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-sm mt-2">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                            ${order.total.toLocaleString()}
                        </span>
                        <Link
                            href={`/order/${order._id}`}
                            className="text-blue-500 text-xs hover:underline"
                        >
                            Ver detalles
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}
