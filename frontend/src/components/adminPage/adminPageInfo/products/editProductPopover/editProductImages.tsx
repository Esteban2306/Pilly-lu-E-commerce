"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Upload } from "lucide-react"
import ProductImageUploader from "@/components/buttons/buttonUploadthing/buttonUploadthing"
import { productApi } from "@/services/ProductApi"
import { Img } from "@/components/adminPage/createProduct/types"

export default function EditProductImages({ productId }: { productId: string }) {
    const [images, setImages] = useState<Img[]>([])
    const [editingImageId, setEditingImageId] = useState<string | null>(null)

    useEffect(() => {
        const fetchImages = async () => {
            const res = await productApi.getImagesByProductId<Img[]>(productId)
            setImages(res)
        }
        fetchImages()
    }, [productId])

    const handleReplaceImage = async (imageId: string, newUrl: string) => {
        await productApi.updateImages({ url: newUrl }, imageId)
        setImages(prev =>
            prev.map(img => (img._id === imageId ? { ...img, url: newUrl } : img))
        )
        setEditingImageId(null)
    }

    const handleNewUpload = async (urls: string[]) => {
        const newImages = urls.map(url => ({ url, isMain: false }))
        const response = await productApi.addImages(productId, newImages) as { newImageDocs: Img[] }
        const created = response.newImageDocs ?? []
        setImages(prev => [...prev, ...created])
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map(img => (
                <div key={img._id} className="relative group">
                    <Image
                        src={img.url}
                        alt="product image"
                        width={120}
                        height={120}
                        className="rounded-md object-cover border border-gray-300 size-[120px]"
                    />

                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setEditingImageId(img._id ?? null)}
                        >
                            <Upload size={14} />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={async () => {
                                if (!img._id) return
                                await productApi.updateImages({ url: null }, img._id)
                                setImages(prev => prev.filter(i => i._id !== img._id))
                            }}
                        >
                            <X size={14} />
                        </Button>
                    </div>

                    {editingImageId === img._id && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                            <ProductImageUploader
                                compact
                                onUploadComplete={urls => img._id && handleReplaceImage(img._id, urls[0])}
                            />
                        </div>
                    )}
                </div>
            ))}

            <ProductImageUploader compact onUploadComplete={handleNewUpload} />
        </div>
    )
}