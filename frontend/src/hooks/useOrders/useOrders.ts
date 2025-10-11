import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { orderApi } from "@/services/OrderApi"
import { FiltersRole, Order } from "./types"


export function useOrders(filters: FiltersRole) {
    return useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await orderApi.getOrder('') as { order: Order[] }
            return res.order
        },
        select: (orders) => {
            return orders.filter(o => {
                const text = `${o.user?.name || ''} ${o.user?.email || ''} ${o._id}`.toLowerCase()
                const matchesSearch = text.includes(filters.search.toLowerCase())

                const matchesStatus =
                    filters.status === 'all' || o.status === filters.status

                const matchesDateFrom =
                    !filters.dateFrom || new Date(o.createdAt) >= new Date(filters.dateFrom)

                const matchesDateTo =
                    !filters.dateTo || new Date(o.createdAt) <= new Date(filters.dateTo)

                return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo
            }).sort((a, b) => {
                if (filters.sort === 'createdAt_desc') {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                } else {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                }
            })
        }
    })
}

export function useDeleteOrders() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => orderApi.deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        }
    })
}

export function useUpdateOrders() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
            orderApi.updateOrder(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        }
    })
}