"use client";

import Image from "next/image";
import Link from "next/link";
import ProductGallery from "@/components/product/productGallery/productGallery";
import { Product } from "@/types/productsCategory.types";

interface Categoria {
    nombre: string;
    slug: string;
    categoryId: string;
    icono: string;
}

interface Props {
    categorias: Categoria[];
    productos: Product[];
}

export default function ProductsHomeClient({ categorias, productos }: Props) {
    return (
        <main className="min-h-screen">
            <div className="flex justify-center mt-30 mb-10">
                <h1 className="text-4xl font-bold text-zinc-800 tracking-wide">
                    Categorías
                </h1>
            </div>

            <div
                className="
          grid grid-cols-2 sm:grid-cols-3
          lg:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]
          gap-3 justify-center justify-items-center px-6
        "
            >
                {categorias.map((cat, i) => (
                    <Link
                        href={`/category/${cat.categoryId}`}
                        key={i}
                        className="group flex flex-col items-center max-sm:last:col-span-2"
                    >
                        <div
                            className="
                w-28 h-28 rounded-full bg-blue-300 shadow-md
                flex items-center justify-center
                hover:-translate-y-2 hover:scale-105 hover:shadow-2xl
                transition-all duration-300 ease-out
              "
                        >
                            <Image
                                src={cat.icono}
                                alt={cat.nombre}
                                width={60}
                                height={60}
                                className="object-contain transition-transform duration-300 group-hover:rotate-6"
                            />
                        </div>
                        <p
                            className="
                mt-3 text-lg font-medium text-gray-700
                group-hover:text-blue-600 transition-colors duration-300
              "
                        >
                            {cat.nombre}
                        </p>
                    </Link>
                ))}
            </div>

            <div
                className="
          grid justify-center gap-8 mt-20 mb-18
          [grid-template-columns:repeat(1,280px)]
          sm:[grid-template-columns:repeat(2,280px)]
          lg:[grid-template-columns:repeat(3,280px)]
        "
            >
                {productos.map((p) => (
                    <ProductGallery
                        key={p._id}
                        _id={p._id}
                        productName={p.productName}
                        price={p.price}
                        images={p.images}
                        color={p.color}
                        finalPrice={p.finalPrice}
                        offer={p.offer}
                        stock={p.stock}
                    />
                ))}
            </div>
        </main>
    );
}