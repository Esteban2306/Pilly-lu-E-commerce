"use client"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useUpdateOrders } from "@/hooks/useOrders/useOrders"
import { Edit } from "lucide-react"
import { OrderType } from "@/types/order.types"

export default function OrderEditPopover({ order }: any) {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(order?.status || "")
    const updateOrder = useUpdateOrders()

    const handleSubmit = async () => {
        await updateOrder.mutateAsync({ id: order.id, data: { status } })
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 w-full justify-start"
                >
                    <Edit size={14} /> Editar
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-64 bg-white shadow-xl border rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Editar estado de orden</h3>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700">Estado</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded-lg p-2 text-sm"
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="procesando">En proceso</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleSubmit}
                        disabled={updateOrder.isPending}
                    >
                        Guardar
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}