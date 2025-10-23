'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import OrderFilterBar from "./OrderFilterBar"
import AdminDataGrid from "../adminDataGrid/AdminDataGrid"
import { useOrders, useDeleteOrders } from "@/hooks/useOrders/useOrders"
import { useDebounce } from "@/hooks/useDebounce/useDebounce"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Eye, Trash2, MoreVertical } from 'lucide-react'
import OrderEditPopover from "./OrderEditPopover"
import { OrderRow } from '@/types/order.types'


export default function OrderAdminClient() {
    const router = useRouter()

    const initialFilters = {
        search: "",
        status: "all",
        dateFrom: "",
        dateTo: "",
        sort: "createdAt_desc",

    }

    const [searchFilters, setSearchFilters] = useState("")
    const [filters, setFilters] = useState(initialFilters)

    const debouncedSearch = useDebounce(searchFilters, 600)

    const debouncedFilters = {
        ...filters,
        search: debouncedSearch,
    }

    const { data: orders = [], isLoading, isError } = useOrders(debouncedFilters)
    const deleteOrderMutation = useDeleteOrders()

    const handleDelete = (id: string | number) => {
        deleteOrderMutation.mutate(id as string)
    }

    const handleView = (id: string) => {
        router.push(`/order/${id}`)
    }

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleResetFilters = () => {
        setFilters(initialFilters)
        setSearchFilters("")
    }

    if (isLoading) return <p className="text-center mt-10">Cargando órdenes...</p>
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar órdenes</p>

    return (
        <div className="p-8 min-h-screen">
            <h1 className="text-3xl text-black font-black mb-6">Gestión de Órdenes</h1>

            <OrderFilterBar
                searchValue={searchFilters}
                onSearchChange={setSearchFilters}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            <div className="mt-6">
                <AdminDataGrid<OrderRow>
                    data={orders.map(o => ({
                        _id: o._id,
                        user: o.user?.name || "Sin nombre",
                        total: o.total,
                        status: o.status,
                        updateAt: o.updateAt,
                        createdAt: new Date(o.createdAt).toLocaleDateString("es-CO"),
                    }))}
                    columns={[
                        { key: "id", label: "Orden" },
                        { key: "user", label: "Nombre" },
                        { key: "createdAt", label: "Fecha creación" },
                        { key: "status", label: "Estado" },
                        { key: "total", label: "Total" },
                    ]}
                    onDelete={handleDelete}
                    renderActions={(row) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:bg-gray-100"
                                >
                                    <MoreVertical size={16} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="end"
                                className="w-40 p-2 bg-white shadow-lg border rounded-xl space-y-1"
                            >
                                <button
                                    onClick={() => handleView(row._id)}
                                    className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <Eye size={14} /> Ver orden
                                </button>
                                <OrderEditPopover order={row} />
                                <button
                                    onClick={() => handleDelete(row._id)}
                                    className="flex items-center gap-2 w-full px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    <Trash2 size={14} /> Eliminar
                                </button>
                            </PopoverContent>
                        </Popover>
                    )}
                />
            </div>
        </div>
    )
}