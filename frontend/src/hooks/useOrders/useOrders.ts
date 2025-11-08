import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { orderApi } from "@/services/OrderApi"
import { FiltersRole, Order } from "./types"


export function useOrders(filters: FiltersRole) {
    return useQuery<Order[]>({
        queryKey: ['orders', filters],
        queryFn: async () => {
            const res = await orderApi.getOrder('') as { order: Order[] }
            return res.order
        },
        select: (orders) => {
            return orders
                .filter((o) => {
                    const text = `${o.user?.name || ''} ${o.user?.email || ''} ${o._id}`.toLowerCase()
                    const matchesSearch = text.includes(filters.search.toLowerCase())

                    const matchesStatus =
                        filters.status === 'all' || o.status === filters.status

                    const matchesDateFrom =
                        !filters.dateFrom || new Date(o.createdAt) >= new Date(filters.dateFrom)

                    const matchesDateTo =
                        !filters.dateTo || new Date(o.createdAt) <= new Date(filters.dateTo)

                    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo
                })
                .sort((a, b) => {
                    if (filters.sort === 'createdAt_desc') {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    } else {
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    }
                })
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        retry: 1,
    })
}

export function useDeleteOrders() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (_id: string) => orderApi.deleteOrder(_id),
        onSuccess: (_data, _id) => {
            queryClient.setQueryData<Order[]>(['orders'], (oldOrders) => {
                if (!oldOrders) return []
                return oldOrders.filter(order => order._id !== _id)
            })
        }
    })
}

export function useUpdateOrders() {
    const queryClient = useQueryClient()

    return useMutation<Order, unknown, { _id: string; data: Record<string, unknown> }>({
        mutationFn: ({ _id, data }) =>
            orderApi.updateOrder(data, _id) as Promise<Order>,
        onSuccess: (updatedOrder: Order) => {
            queryClient.setQueryData<Order[]>(['orders'], (oldOrders) => {
                if (!oldOrders) return []
                return oldOrders.map((order) =>
                    order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order
                )
            })
        },
    })
}

export function useUserOrders(userId?: string) {
    return useQuery<Order[]>({
        queryKey: ['orders', userId],
        queryFn: async () => {
            if (!userId) return [];
            const res = await orderApi.getOrdersByUserId<{ formattedOrders: Order[] }>(userId);
            return res.formattedOrders || [];
        },
        initialData: [],
        enabled: !!userId,
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}