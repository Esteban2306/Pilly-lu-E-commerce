"use client"

import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { Category, Product } from "@/types/productsCategory.types"
import { useProductsByCategory } from "@/hooks/useProducts/useProducts"
import ProductGallery from "@/components/product/productGallery/productGallery"
import { Pagination } from "@/utils/pagination/pagination"

interface CategoryClientProps {
    categoryId: string
    category: Category
    initialProducts: Product[]
    icon: StaticImageData
}

export default function PageCategoryClient({
    categoryId,
    category,
    initialProducts,
    icon,
}: CategoryClientProps) {
    const [page, setPage] = useState(1)

    const { data, isLoading } = useProductsByCategory(categoryId, page)

    const products = data?.products ?? initialProducts
    const totalPages = data?.totalPages ?? 1

    return (
        <main className="min-h-screen pb-20">
            <div className="flex flex-col items-center mt-32 mb-10">
                <div className="group relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <Image
                        src={icon}
                        alt={category.categoryName}
                        width={60}
                        height={60}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>

                <h1 className="mt-6 text-5xl font-extrabold bg-clip-text bg-gradient-to-r text-black tracking-wide uppercase drop-shadow-sm">
                    {category.categoryName}
                </h1>
            </div>

            <div
                className="
          grid justify-center gap-7 mt-20 mb-18
          [grid-template-columns:repeat(1,280px)]
          sm:[grid-template-columns:repeat(2,280px)]
          lg:[grid-template-columns:repeat(3,280px)]
        "
            >
                {isLoading ? (
                    <p className="text-center col-span-full text-zinc-400">Cargando...</p>
                ) : (
                    products.map((p) => (
                        <ProductGallery
                            key={p._id}
                            _id={p._id}
                            productName={p.productName}
                            price={p.price}
                            images={p.images}
                            color={p.color}
                            finalPrice={p.finalPrice || 0}
                            offer={p.offer}
                        />
                    ))
                )}
            </div>

            <div className="flex justify-center mt-12">
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
        </main>
    )
}