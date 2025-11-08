'use client'

import { Button } from '@/components/ui/button'
import { Trash2, ChevronDown } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile/useIsMobile'
import { useState } from 'react'

interface Column {
    key: string
    label: string
}

type BaseRow = { _id: string } & Record<string, unknown>

interface AdminDataGridProps<T extends BaseRow> {
    data: T[]
    columns: Column[]
    onDelete?: (_id: string | number) => void
    renderActions?: (row: T) => React.ReactNode
}

export default function AdminDataGrid<T extends BaseRow>({
    data,
    columns,
    onDelete,
    renderActions,
}: AdminDataGridProps<T>) {
    const isMobile = useIsMobile()
    const [openRow, setOpenRow] = useState<string | null>(null)

    if (isMobile) {
        return (
            <div className="space-y-3">
                {data.map((row) => {
                    const isOpen = openRow === row._id
                    const mainLabel = String(row[columns[0].key])

                    return (
                        <div
                            key={row._id}
                            className="border border-blue-100 rounded-xl bg-white shadow-sm overflow-hidden transition"
                        >
                            <button
                                onClick={() => setOpenRow(isOpen ? null : row._id)}
                                className="w-full flex justify-between items-center px-4 py-3 text-left text-black"
                            >
                                <span>{mainLabel}</span>
                                <ChevronDown
                                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {isOpen && (
                                <div className="px-4 py-3 border-t border-blue-50 text-sm space-y-2 bg-blue-50/30">
                                    {columns.slice(1).map((col) => (
                                        <div key={col.key} className="flex justify-between">
                                            <span className="font-medium text-gray-600">{col.label}:</span>
                                            <span className="text-gray-800 truncate ml-2">{String(row[col.key])}</span>
                                        </div>
                                    ))}

                                    <div className="pt-2 border-t border-blue-100 flex justify-end">
                                        {renderActions ? (
                                            renderActions(row)
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                                onClick={() => onDelete?.(row._id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-blue-100">
            <table className="w-full text-sm text-left">
                <thead className="bg-blue-100/70 text-blue-600 font-semibold">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-3 whitespace-nowrap">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-4 py-3 text-center whitespace-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={row._id}
                            className={`transition-all border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'
                                } hover:bg-blue-100/60 hover:shadow-sm`}
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="px-5 py-3 text-gray-700 text-[15px] leading-relaxed"
                                >
                                    {String(row[col.key])}
                                </td>
                            ))}
                            <td className="px-5 py-3 text-center">
                                {renderActions ? (
                                    renderActions(row)
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                                        onClick={() => onDelete?.(row._id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}