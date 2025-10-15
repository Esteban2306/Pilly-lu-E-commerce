'use client'

import { ProductCardProps } from '@/types/product.types'
import useProductFetchImages from '@/hooks/productFetchImages/productFetchImages'
import Image from 'next/image'
import imageProduct from '../../../../../../public/images/products/productProof.jpg'
import Delete from '@/components/buttons/deleteButton/deleteButton'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EditProductPopover from '../editProductPopover/EditProductPopover'
import { useToggleFeaturedProducts } from '@/hooks/useProducts/useProducts'
import { cn } from '@/lib/utils'
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat/useCurrencyFormat';
import Link from 'next/link'

export default function CartAdminProduct({
    _id,
    productName,
    price,
    category,
    images,
    isFeatured,
    color,
    offer,
    description,
    stock,
    sku
}: ProductCardProps) {
    const { mainImage } = useProductFetchImages(_id)
    const { mutate: toggleFeatured, isPending } = useToggleFeaturedProducts()
    const { formatCurrency } = useCurrencyFormat()
    const handleToggle = () => {
        toggleFeatured(_id)
    }


    return (
        <div
            className="
                relative 
                bg-white 
                rounded-2xl 
                shadow-sm 
                hover:shadow-md 
                transition-all 
                duration-300 
                overflow-hidden 
                flex 
                flex-col
                border border-zinc-100
                hover:border-blue-200
            "
        >

            <div className="relative h-[260px] w-full overflow-hidden">
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={isPending}
                    onClick={handleToggle}
                    className={cn(
                        "absolute top-3 right-3 z-30 cursor-pointer rounded-full border border-transparent transition-all duration-300 hover:scale-110",
                        isFeatured
                            ? "text-blue-500 bg-blue-50/80 border-blue-200 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                            : "text-blue-700 hover:text-blue-400 hover:bg-blue-50"
                    )}
                >
                    <Star
                        strokeWidth={2}
                        fill={isFeatured ? "currentColor" : "none"}
                        className="w-5 h-5 transition-all duration-300"
                    />
                </Button>

                <EditProductPopover
                    product={{ _id, productName, price, category, images, isFeatured, color, offer, status, description, stock, sku }}
                />

                <Image
                    src={mainImage?.url || imageProduct}
                    alt={productName || 'Imagen del producto'}
                    fill
                    sizes="(max-width: 750px) 80vw, 260px"
                    className="object-cover rounded-2xl"
                />
            </div>

            <div className="flex-1 px-4 py-3 flex flex-col justify-between">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex flex-col">
                        <Link href={`/product/${_id}`}>
                            <h3 className="text-[16px] font-semibold text-zinc-800 truncate max-w-[180px]">
                                {productName}
                            </h3>
                        </Link>
                        <span className="text-xs text-zinc-500 mt-0.5  bg-primary rounded-3xl w-fit p-1">
                            {category?.categoryName || 'Sin categoría'}
                        </span>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">{formatCurrency(price)}</p>
                    </div>
                </div>

                <div className="flex justify-center mt-3">
                    <Delete id={_id} />
                </div>
            </div>
        </div>
    )
}