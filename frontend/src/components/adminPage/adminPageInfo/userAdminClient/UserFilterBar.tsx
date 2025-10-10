'use client'

interface FilterBarProps {
    filters: string
    filtersTwo: string
    onChange: (filters: any) => void
    onChangeTwo: (filters: any) => void
}

export default function UserFilterBar({ filters, onChange, onChangeTwo, filtersTwo }: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-blue-100">
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={filters}
                onChange={(e) => onChange(e.target.value)}
                className="flex px-3 py-2 border w-sm border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
            />
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
    )
}