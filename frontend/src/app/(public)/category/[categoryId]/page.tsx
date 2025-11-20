import Image, { StaticImageData } from "next/image"
import { productApi } from "@/services/ProductApi"
import { Category, Product } from "@/types/productsCategory.types"
import { Suspense } from "react"
import PageCategoryClient from "@/components/home/categoryClient/pageCategoryClient"

import aretes from "../../../../../public/icons/iconAirrings.svg"
import manilla from "../../../../../public/icons/iconBracelet.svg"
import cadenas from "../../../../../public/icons/iconChains.svg"
import dijes from "../../../../../public/icons/iconCharms.svg"
import anillos from "../../../../../public/icons/iconRing.svg"

interface ProductCategoryPageProps {
    params: Promise<{ categoryId: string }>
}

export default async function productIdPage({ params }: ProductCategoryPageProps) {
    const { categoryId } = await params

    const { category, products } = await productApi.getByCategory<{ category: Category; products: Product[] }>(
        categoryId
    )

    const iconMap: Record<string, StaticImageData> = {
        anillos,
        aretes,
        manillas: manilla,
        dijes,
        cadenas,
    }

    const iconoCategoria = iconMap[category.categoryName.toLowerCase()] || anillos

    if (!products.length) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-zinc-800">Categoría vacía</h1>
                <p className="text-zinc-500 mt-2">No hay productos en esta categoría todavía.</p>
            </main>
        )
    }

    return (
        <Suspense fallback={<div className="text-center py-20">Cargando productos...</div>}>
            <PageCategoryClient
                categoryId={categoryId}
                category={category}
                initialProducts={products}
                icon={iconoCategoria}
            />
        </Suspense>
    )
}