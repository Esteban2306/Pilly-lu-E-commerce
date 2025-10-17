import Image from "next/image";
import Link from "next/link";
import aretes from "../../../../public/icons/iconAirrings.svg";
import manilla from "../../../../public/icons/iconBracelet.svg";
import cadenas from "../../../../public/icons/iconChains.svg";
import dijes from "../../../../public/icons/iconCharms.svg";
import anillos from "../../../../public/icons/iconRing.svg";
import ProductGallery from "@/components/product/productGallery/productGallery";
import { productApi } from "@/services/ProductApi";
import { Product } from "@/types/productsCategory.types";

export default async function productsHome() {
    const categorias = [
        { nombre: "Anillos", icono: anillos, slug: "anillos", categoryId: "68c841d9aa6f123a0efb5c80" },
        { nombre: "Aretes", icono: aretes, slug: "aretes", categoryId: "68c841bfaa6f123a0efb5c7e" },
        { nombre: "Manilla", icono: manilla, slug: "manillas", categoryId: "68c841ecaa6f123a0efb5c82" },
        { nombre: "Dijes", icono: dijes, slug: "dijes", categoryId: "68c841f1aa6f123a0efb5c84" },
        { nombre: "Cadenas", icono: cadenas, slug: "cadenas", categoryId: "68c841fbaa6f123a0efb5c86" },
    ];

    const product = await productApi.getAll<Product[]>();

    return (
        <main className="min-h-screen">
            <div className="flex justify-center mt-28 mb-10">
                <h1 className="text-4xl font-bold text-zinc-800 tracking-wide">Categorías</h1>
            </div>

            <div
                className="
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]
                gap-6
                justify-center
                justify-items-center
                px-6
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
          grid 
          justify-center 
          gap-7 
          mt-20 mb-18
          [grid-template-columns:repeat(1,280px)]
          sm:[grid-template-columns:repeat(2,280px)]
          lg:[grid-template-columns:repeat(3,280px)]
        "
            >
                {product.map((p) => (
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
    );
}