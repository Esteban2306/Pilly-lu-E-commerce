import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { orderApi } from "@/services/OrderApi"
import { FiltersRole, Order } from "./types"


export function useOrders(filters: FiltersRole & { page: number; limit: number }) {
    return useQuery({
        queryKey: ['orders', filters],
        queryFn: async () => {
            const params = new URLSearchParams()

            if (filters.search) params.append("search", filters.search)
            if (filters.status && filters.status !== "all") params.append("status", filters.status)
            if (filters.dateFrom) params.append("dateFrom", filters.dateFrom)
            if (filters.dateTo) params.append("dateTo", filters.dateTo)
            params.append("sort", filters.sort || "createdAt_desc")
            params.append("page", filters.page.toString())
            params.append("limit", filters.limit.toString())

            const res = await orderApi.getOrder(params.toString()) as {
                orders: Order[]
                pagination?: {
                    total: number
                    page: number
                    limit: number
                    totalPages: number
                }
            }

            return {
                orders: res.orders,
                pagination: res.pagination || { total: res.orders.length, page: 1, totalPages: 1 },
            }
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
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