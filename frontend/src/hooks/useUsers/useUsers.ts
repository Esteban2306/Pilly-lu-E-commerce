import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "@/services/UsersApi"
import { User, Filters } from "./types"

export function useUsers(filters: Filters) {
    return useQuery({
        queryKey: ['users', filters],
        queryFn: async () => {
            const res = await userApi.getAllUsers<{ data: User[], pagination: number }>(
                filters.page,
                filters.limit
            )

            const users = res.data

            const filtered = users.filter(u => {
                const matchesSearch =
                    u.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
                    u.email.toLowerCase().includes(filters.search.toLowerCase())

                const matchesRole =
                    filters.role === 'all' || u.role?.name === filters.role

                return matchesSearch && matchesRole
            })

            return {
                users: filtered,
                pagination: res.pagination,
            }
        },
    })
}

export function useDeleteUsers() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (_id: string) => userApi.deleteUser(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })
}