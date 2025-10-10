import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "@/services/UsersApi"
import { User, Filters } from "./types"

export function useUsers(filters: Filters) {
    return useQuery<User[]>({
        queryKey: ['users', filters],
        queryFn: async () => {
            const res = await userApi.getAllUsers() as { data: User[] }
            const users = res.data

            return users.filter(u => {
                const matchesSearch =
                    u.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
                    u.email.toLowerCase().includes(filters.search.toLowerCase())

                const matchesRole =
                    filters.role === 'all' || u.role?.name === filters.role

                return matchesSearch && matchesRole
            })
        },
    })
}

export function useDeleteUsers() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userApi.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })
}