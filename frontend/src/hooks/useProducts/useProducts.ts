import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/services/ProductApi";
import { Product } from "@/types/productsCategory.types";

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => productApi.getAll<Product[]>()
    })
}

export function useDeleteProducts() {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => productApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}

export function useUpdateProducts() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
            productApi.update(data, id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },

        onError: (error) => {
            console.error("Error actualizando producto:", error);
        },

    })
}

export function useToggleFeaturedProducts() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => productApi.toggleFeatured(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },

        onError: (error) => {
            console.error("Error al destacar un producto:", error);
        },
    })
}