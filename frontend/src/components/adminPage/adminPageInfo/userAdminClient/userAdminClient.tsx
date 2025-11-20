'use client'

import { useState } from "react"
import UserFilterBar from "./UserFilterBar"
import AdminDataGrid from "../adminDataGrid/AdminDataGrid"
import { useDeleteUsers, useUsers } from "@/hooks/useUsers/useUsers"
import { useDebounce } from "@/hooks/useDebounce/useDebounce"
import { UserRow } from '@/types/user.types'
import { Pagination } from "@/utils/pagination/pagination"

export default function UserAdminClient() {
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [searchFilters, setSearchFilters] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')

    const debouncedSearch = useDebounce(searchFilters, 600)

    const filters = {
        role: roleFilter,
        search: debouncedSearch,
        page,
        limit,
    }

    const { data, isLoading, isError } = useUsers(filters)
    const deleteUserMutation = useDeleteUsers()

    if (isLoading) return <p className="text-center mt-10">Cargando usuarios...</p>
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar usuarios</p>

    const users = data?.users || []
    const totalPages = data?.pagination

    return (
        <div className="p-8 min-h-screen">
            <h1 className="text-2xl font-black mb-6">Gestión de Usuarios</h1>

            <UserFilterBar
                filters={searchFilters}
                filtersTwo={roleFilter}
                onChange={setSearchFilters}
                onChangeTwo={setRoleFilter}
            />

            <AdminDataGrid
                data={users.map(u => ({
                    name: u.fullName,
                    _id: u._id,
                    email: u.email,
                    role: u.role?.name || 'sin rol',
                    createdAt: new Date(u.createdAt).toLocaleDateString('es-CO')
                }))}
                columns={[
                    { key: 'name', label: 'Nombre' },
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Rol' },
                    { key: 'createdAt', label: 'Fecha creación' },
                ]}
                onDelete={(_id) => deleteUserMutation.mutate(_id as string)}
            />

            <Pagination page={page} totalPages={totalPages ?? 0} onChange={setPage} />
        </div>
    )
}   