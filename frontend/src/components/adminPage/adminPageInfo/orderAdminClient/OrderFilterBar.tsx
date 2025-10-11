"use client"

interface FilterBarProps {
    searchValue: string
    onSearchChange: (value: string) => void
    filters: {
        status: string
        dateFrom: string
        dateTo: string
        sort: string
    }
    onFilterChange: (key: string, value: string) => void
    onReset?: () => void
}

export default function OrderFilterBar({
    searchValue,
    onSearchChange,
    filters,
    onFilterChange,
    onReset,
}: FilterBarProps) {
    return (
        <div className="flex flex-wrap items-end gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-blue-100">
            <div className="flex flex-col min-w-[480px]">
                <label className="text-xs text-gray-500 mb-1">Buscar</label>
                <input
                    type="text"
                    placeholder="Usuario o ID de orden..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Estado</label>
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange("status", e.target.value)}
                    className="px-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                >
                    <option value="all">Todos</option>
                    <option value="pagado">Pagado</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value='procesando'>Procesando</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Desde</label>
                <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => onFilterChange("dateFrom", e.target.value)}
                    className="px-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Hasta</label>
                <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => onFilterChange("dateTo", e.target.value)}
                    className="px-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Orden</label>
                <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange("sort", e.target.value)}
                    className="px-3 py-2 w-32 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                >
                    <option value="createdAt_desc">Más recientes</option>
                    <option value="createdAt_asc">Más antiguos</option>
                </select>
            </div>

            {onReset && (
                <button
                    onClick={onReset}
                    className="ml-20 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-blue-100 hover:ring-blue-200 transition"
                >
                    Reiniciar
                </button>
            )}
        </div>
    )
}
