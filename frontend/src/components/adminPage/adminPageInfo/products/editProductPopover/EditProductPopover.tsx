"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, FileEdit, X } from "lucide-react"
import { useUpdateProducts } from "@/hooks/useProducts/useProducts"
import { Product } from "@/types/productsCategory.types"
import { Img } from "@/components/adminPage/createProduct/types"
import EditProductImages from "./editProductImages"

export default function EditProductPopover({ product }: { product: Product }) {

    const [images, setImages] = useState<Img[]>([]);
    const [form, setForm] = useState<Omit<Product, "category">>({
        _id: "",
        productName: "",
        price: 0,
        sku: "",
        description: "",
        color: "",
        offer: "",
        status: "draft",
        stock: 0,
        images
    });

    useEffect(() => {
        if (product) {
            setForm({
                _id: product._id,
                productName: product.productName || "",
                price: product.price || 0,
                sku: product.sku || "",
                description: product.description || "",
                color: product.color || "",
                offer: product.offer || "",
                status: product.status || "draft",
                stock: product.stock || 0,
                images: product.images,
            });
        }
    }, [product]);

    const [open, setOpen] = useState(false)
    const [uploading, setUploading] = useState(false)

    const updateMutation = useUpdateProducts()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setImages([])
    }

    const handleSubmit = () => {
        updateMutation.mutate(
            {
                id: product._id,
                data: {
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock),
                },
            },
            {
                onSuccess: () => setOpen(false),
            }
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-blue-100 shadow-sm"
                >
                    <FileEdit className="w-4 h-4 text-blue-600" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[480px] bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-lg rounded-xl p-6"
                side="right"
                align="center"
                sideOffset={8}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-blue-700">Editar Producto</h2>
                    <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-blue-600">
                        <X size={18} />
                    </button>
                </div>

                <div className="grid gap-3 max-h-[70vh] overflow-y-scroll pr-2 pl-1 scroll-p-2">
                    <div className="grid gap-1">
                        <Label>Nombre</Label>
                        <Input name="productName" value={form.productName} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Precio</Label>
                            <Input name="price" type="number" value={form.price} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Stock</Label>
                            <Input name="stock" type="number" value={form.stock} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Color</Label>
                            <Input name="color" value={form.color} onChange={handleChange} className="focus:ring-2 focus:ring-sky-300 focus:border-sky-300" />
                        </div>
                        <div>
                            <Label>Oferta</Label>
                            <Input name="offer" value={form.offer} onChange={handleChange} className="focus:ring-2 focus:ring-sky-300 focus:border-sky-300" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Status</Label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg text-sm p-2 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="draft">Borrador</option>
                                <option value="published">Publicado</option>
                            </select>
                        </div>

                        <div>
                            <Label>SKU</Label>
                            <Input name="sku" value={form.sku} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <Label>Descripción</Label>
                        <Textarea
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            className="resize-none"
                        />
                    </div>

                    <div className="mt-3">
                        <Label>Imágenes</Label>
                        <div className="flex gap-2 mt-2">
                            <EditProductImages productId={product._id} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5 gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={updateMutation.isPending || uploading}>
                        {updateMutation.isPending ? (
                            <>
                                <Loader2 className="animate-spin mr-2" /> Guardando...
                            </>
                        ) : (
                            "Guardar Cambios"
                        )}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}