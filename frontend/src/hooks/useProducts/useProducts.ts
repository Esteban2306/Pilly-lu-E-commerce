import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/services/ProductApi";
import { Product } from "@/types/productsCategory.types";
import { categoryApi } from "@/services/CategoryApi";
import { Category } from "@/types/productsCategory.types";

export function useProducts(filters?: Record<string, string | number | boolean>) {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        params.append(key, String(value));
                    }
                });
            }
            return productApi.getAll<Product[]>(`?${params.toString()}`);

        },
    });
}

export function useGetCategory() {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => categoryApi.getCategory<Category[] | undefined>()
    })
}

export function useGetRelatedProducts(id?: string) {
    return useQuery({
        queryKey: ['relatedProducts', id],
        queryFn: async () => {
            const res = await productApi.getRelatedProducts<{ relatedProducts: Product[] }>(id!);
            return res.relatedProducts || [];
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useDeleteProducts() {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (_id: string) => productApi.delete(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}

export function useUpdateProducts() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ _id, data }: { _id: string; data: Record<string, unknown> }) =>
            productApi.update(_id, data),

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
        mutationFn: (_id: string) => productApi.toggleFeatured(_id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },

        onError: (error) => {
            console.error("Error al destacar un producto:", error);
        },
    })
}

