"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useUpdateProducts } from "@/hooks/useProducts/useProducts"
import { Product } from "@/types/productsCategory.types"
import { Loader2, FileEdit, X } from "lucide-react"

export default function EditProductPopover({ product }: { product: Product }) {
    const [form, setForm] = useState({
        productName: product.productName || "",
        price: product.price || "",
        sku: product.sku || "",
        description: product.description || "",
    })

    const [open, setOpen] = useState(false)
    const updateMutation = useUpdateProducts()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        updateMutation.mutate(
            {
                id: product._id,
                data: {
                    productName: form.productName,
                    price: Number(form.price),
                    sku: form.sku,
                    description: form.description,
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
                    className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-blue-100 shadow-sm cursor-pointer"
                >
                    <FileEdit className="w-4 h-4 text-blue-600" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[420px] bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-lg rounded-xl p-6"
                side="right"
                align="center"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-blue-700">Update Product</h2>
                    <button
                        className="text-gray-500 hover:text-blue-600"
                        onClick={() => setOpen(false)}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-1">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                            id="productName"
                            name="productName"
                            value={form.productName}
                            onChange={handleChange}
                            className="bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                            id="sku"
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className="bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-300 resize-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-5 gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={updateMutation.isPending}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        {updateMutation.isPending ? (
                            <>
                                <Loader2 className="animate-spin mr-2" /> Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}