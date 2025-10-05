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