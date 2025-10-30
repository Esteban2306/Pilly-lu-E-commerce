'use client'

import { useState } from "react"
import UserFilterBar from "./UserFilterBar"
import AdminDataGrid from "../adminDataGrid/AdminDataGrid"
import { useDeleteUsers, useUsers } from "@/hooks/useUsers/useUsers"
import { useDebounce } from "@/hooks/useDebounce/useDebounce"
import { UserRow } from '@/types/user.types'

export default function USerAdminClient() {
    const [searchFilters, setSearchFilters] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')

    const debouncedSerch = useDebounce(searchFilters, 600)

    const debouncedFilters = { role: roleFilter, search: debouncedSerch }

    const { data: users = [], isLoading, isError } = useUsers(debouncedFilters)
    const deleteUserMutation = useDeleteUsers()

    const handleDelete = (_id: string | number) => {
        deleteUserMutation.mutate(_id as string)
    }


    if (isLoading) return <p className="text-center mt-10">Cargando usuarios...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar usuarios</p>;

    return (
        <div className="p-8  min-h-screen">
            <h1 className="text-2xl text-black font-black mb-6">Gestión de Usuarios</h1>

            <UserFilterBar filters={searchFilters} filtersTwo={roleFilter} onChange={setSearchFilters} onChangeTwo={setRoleFilter} />

            <div className="mt-6">
                <AdminDataGrid<UserRow>
                    data={users.map(u => ({
                        _id: u._id,
                        name: u.fullName,
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
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}