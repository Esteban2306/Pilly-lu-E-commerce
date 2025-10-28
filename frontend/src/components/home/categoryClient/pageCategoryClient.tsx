"use client"

import Image, { StaticImageData } from "next/image"
import ProductGallery from "@/components/product/productGallery/productGallery"
import { Category, Product } from "@/types/productsCategory.types"

interface CategoryClientProps {
    category: Category
    products: Product[]
    icon: StaticImageData
}

export default function PageCategoryClient({ category, products, icon }: CategoryClientProps) {
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
                {products.map((p) => (
                    <ProductGallery
                        key={p._id}
                        _id={p._id}
                        productName={p.productName}
                        price={p.price}
                        images={p.images}
                        color={p.color}
                        finalPrice={p.finalPrice}
                        offer={p.offer}
                    />
                ))}
            </div>
        </main>
    )
}