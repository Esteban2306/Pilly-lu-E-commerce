'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Column {
    key: string
    label: string
}

interface AdminDataGridProps {
    data: any[]
    columns: Column[]
    onDelete?: (id: string | number) => void
    renderActions?: (row: any) => React.ReactNode
}

export default function AdminDataGrid({ data, columns, onDelete, renderActions }: AdminDataGridProps) {
    const [openRowId, setOpenRowId] = useState<number | string | null>(null)
    return (
        <>
            {/* ✅ VERSIÓN DESKTOP */}
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
                                key={row.id}
                                className={`transition-all border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-blue-50/40"
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
                                    {renderActions ? (
                                        renderActions(row)
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                                            onClick={() => onDelete?.(row.id)}
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

            {/* ✅ VERSIÓN MOBILE */}
            <div className="block md:hidden bg-white rounded-2xl shadow-md border border-blue-100 divide-y divide-gray-100">
                {data.map((row) => (
                    <div
                        key={row.id}
                        className="px-4 py-3 cursor-pointer"
                        onClick={() => setOpenRowId(openRowId === row.id ? null : row.id)}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-800">{row[columns[0].key]}</p>
                                <p className="text-sm text-gray-500">{row[columns[1].key]}</p>
                            </div>
                            <span
                                className={`transition-transform ${openRowId === row.id ? "rotate-180" : ""
                                    }`}
                            >
                                ⌄
                            </span>
                        </div>

                        <div
                            className={`transition-all duration-300 overflow-hidden ${openRowId === row.id
                                ? "max-h-96 opacity-100 mt-3"
                                : "max-h-0 opacity-0"
                                }`}
                        >
                            {columns.slice(2).map((col) => (
                                <div
                                    key={col.key}
                                    className="flex justify-between py-1 text-sm text-gray-700"
                                >
                                    <span className="text-gray-500">{col.label}:</span>
                                    <span className="font-medium">{row[col.key]}</span>
                                </div>
                            ))}

                            <div className="mt-3 flex justify-end">
                                {renderActions ? (
                                    renderActions(row)
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDelete?.(row.id)
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}