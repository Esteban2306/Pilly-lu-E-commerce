'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { OrderType } from '@/types/order.types'
import { UserType } from '@/types/user.types'

interface Column {
    key: string
    label: string
}

type BaseRow = { _id: string } & Record<string, unknown>

interface AdminDataGridProps<T extends BaseRow> {
    data: T[]
    columns: Column[]
    onDelete?: (id: string | number) => void
    renderActions?: (row: T) => React.ReactNode
}

export default function AdminDataGrid<T extends BaseRow>({
    data,
    columns,
    onDelete,
    renderActions,
}: AdminDataGridProps<T>) {
    const [openRowId, setOpenRowId] = useState<number | string | null>(null)

    return (
        <>
            <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden border border-blue-100">
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
        </>
    )
}