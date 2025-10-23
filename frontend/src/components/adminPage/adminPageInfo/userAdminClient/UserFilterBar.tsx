'use client'

import { useState } from "react"

interface FilterBarProps<T = string, U = string> {
    filters: T
    filtersTwo: U
    onChange: (value: T) => void
    onChangeTwo: (value: U) => void
    onReset?: () => void
}

export default function UserFilterBar({
    filters,
    filtersTwo,
    onChange,
    onChangeTwo,
    onReset,
}: FilterBarProps) {

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
                className={`transition-all duration-300 overflow-hidden ${showFilters
                    ? "max-h-[600px] opacity-100 mt-4 pointer-events-auto"
                    : "max-h-0 opacity-0 pointer-events-none"
                    } md:max-h-none md:opacity-100 md:mt-0 md:pointer-events-auto`}
            >
                <div className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-4">
                    <div className="flex flex-col min-w-[250px] md:min-w-[300px]">
                        <label className="text-xs text-gray-500 mb-1">Buscar</label>
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            value={filters}
                            onChange={(e) => onChange(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                        />
                    </div>

                    <div className="flex flex-col min-w-[130px]">
                        <label className="text-xs text-gray-500 mb-1">Roles</label>
                        <select
                            value={filtersTwo}
                            onChange={(e) => onChangeTwo(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-300 block w-32 p-2.5"
                        >
                            <option value="all">Todos los roles</option>
                            <option value="admin">Admin</option>
                            <option value="lectura">Lectura</option>
                        </select>
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