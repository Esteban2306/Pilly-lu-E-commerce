import Image, { StaticImageData } from "next/image"
import { productApi } from "@/services/ProductApi"
import ProductGallery from "@/components/product/productGallery/productGallery"
import { Category, Product } from "@/types/productsCategory.types"

import aretes from "../../../../../public/icons/iconAirrings.svg"
import manilla from "../../../../../public/icons/iconBracelet.svg"
import cadenas from "../../../../../public/icons/iconChains.svg"
import dijes from "../../../../../public/icons/iconCharms.svg"
import anillos from "../../../../../public/icons/iconRing.svg"



export default async function productIdPage({ params }: { params: { categoryId: string } }) {
    const { category, products } = await productApi.getByCategory<{ category: Category; products: Product[] }>(
        params.categoryId
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
        <main className="min-h-screen pb-20 ">
            <div className="flex flex-col items-center mt-32 mb-10">
                <div className="group relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <Image
                        src={iconoCategoria}
                        alt={category.categoryName}
                        width={60}
                        height={60}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>

                <h1 className="mt-6 text-5xl font-extrabold  bg-clip-text bg-gradient-to-r text-black tracking-wide uppercase drop-shadow-sm">
                    {category.categoryName}
                </h1>

            </div>
            <div
                className="
                    grid 
                    justify-center 
                    gap-7 
                    mt-20 mb-18
                    [grid-template-columns:repeat(1,280px)]
                    sm:[grid-template-columns:repeat(2,280px)]
                    lg:[grid-template-columns:repeat(3,280px)]
        "
            >
                {products.map((p) => (
                    <ProductGallery
                        key={p._id}
                        _id={p._id}
                        productName={p.productName}
                        price={p.price}
                        images={p.images}
                        color={p.color}
                        offer={p.offer}
                    />
                ))}
            </div>
        </main>
    )
}