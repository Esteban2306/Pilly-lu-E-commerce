"use client";

import { useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { BellIcon } from "@/components/icons/NavBar/navBarIconBell";
import { useAuth } from "@/context/authContext";
import { useUserOrders } from "@/hooks/useOrders/useOrders";
import NotificationList from "./notificationList";

export default function ModalNotification({ inline = false }: { inline?: boolean }) {
    const { user } = useAuth();
    const { data: orders = [], isLoading, refetch } = useUserOrders(user?._id);

    useEffect(() => {
        if (user?._id) refetch();
    }, [user?._id, refetch]);

    if (inline) {
        return (
            <div className="p-4 bg-white/80 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md">
                <h3 className="text-center font-bold text-black dark:text-zinc-100 mb-3">
                    Tus órdenes recientes
                </h3>
                <NotificationList orders={orders} isLoading={isLoading} />
            </div>
        );
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    title="Notificaciones"
                    className="cursor-pointer p-2 rounded-lg border border-blue-200 bg-blue-100/50 text-black hover:bg-blue-200/70 transition duration-200 flex items-center justify-center relative"
                >
                    <BellIcon className="size-4 md:size-5" />
                    {orders.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-300 text-black text-[10px] rounded-full px-1.5 py-0.5">
                            {orders.length}
                        </span>
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={10}
                className="w-[320px] max-h-[450px] overflow-y-auto bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-2xl border border-zinc-200/30 dark:border-zinc-700/50 rounded-xl p-3"
            >
                <h3 className="text-center font-bold text-black dark:text-zinc-100 mb-3">
                    Tus órdenes recientes
                </h3>

                <NotificationList orders={orders} isLoading={isLoading} />
            </PopoverContent>
        </Popover>
    );
}