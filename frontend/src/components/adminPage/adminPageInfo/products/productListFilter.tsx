"use client"

import { useState } from "react"
import { useGetCategory } from "@/hooks/useProducts/useProducts"

interface FilterBarProps {
    searchValue: string
    onSearchChange: (value: string) => void
    filters: {
        search: string
        category: string
        minPrice: string
        maxPrice: string
        sortBy: string
    }
    onFilterChange: (key: string, value: string) => void
    onReset?: () => void
}

export default function ProductListFilter({
    searchValue,
    onSearchChange,
    filters,
    onFilterChange,
    onReset,
}: FilterBarProps) {
    const { data: category } = useGetCategory()
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-blue-100 mb-10">
            <div className="flex justify-between items-center w-full md:hidden">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-blue-100 transition"
                >
                    {showFilters ? "Cerrar filtros" : "Filtros"}
                </button>

                {onReset && (
                    <button
                        onClick={onReset}
                        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-blue-100 transition"
                    >
                        Reiniciar
                    </button>
                )}
            </div>

            <div
                className={`transition-all duration-300  ${showFilters ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    } md:max-h-none md:opacity-100 md:mt-0`}
            >
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <div className="flex flex-col min-w-[250px] md:min-w-[320px]">
                            <label className="text-xs text-gray-500 mb-1">Buscar</label>
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                            />
                        </div>

                        <div className="flex flex-col min-w-[150px]">
                            <label className="text-xs text-gray-500 mb-1">Categoría</label>
                            <select
                                value={filters.category}
                                onChange={(e) => onFilterChange("category", e.target.value)}
                                className="px-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                            >
                                <option value="">Todas</option>
                                {category?.map((cat) => (
                                    <option key={cat._id} value={cat.categoryName}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col min-w-[130px]">
                            <label className="text-xs text-gray-500 mb-1">Ordenar por</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => onFilterChange("sortBy", e.target.value)}
                                className="px-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                            >
                                <option value="newest">Más nuevo</option>
                                <option value="price_asc">Más barato</option>
                                <option value="price_desc">Más caro</option>
                            </select>
                        </div>
                    </div>

                    {onReset && (
                        <button
                            onClick={onReset}
                            className="hidden md:block px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-blue-100 transition"
                        >
                            Reiniciar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}