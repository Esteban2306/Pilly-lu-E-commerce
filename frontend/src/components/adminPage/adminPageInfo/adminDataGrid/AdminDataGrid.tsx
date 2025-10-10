'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Column {
    key: string
    label: string
}

interface AdminDataGridProps {
    data: any[]
    columns: Column[]
    onDelete?: (id: string | number) => void
}

export default function AdminDataGrid({ data, columns, onDelete }: AdminDataGridProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-blue-100">
            <table className="w-full text-sm text-left">
                <thead className="bg-blue-100/70 text-blue-800 font-semibold">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-3">{col.label}</th>
                        ))}
                        <th className="px-4 py-3 text-center">Acciones</th>
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
                                    {row[col.key]}
                                </td>
                            ))}
                            <td className="px-5 py-3 text-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                                    onClick={() => onDelete?.(row.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}