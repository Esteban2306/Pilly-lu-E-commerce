import { productApi } from "@/services/ProductApi";
import { Product } from "@/types/productsCategory.types";
import ProductsHomeClient from "@/components/product/productsHomeClient/ProductsHomeClient";

export default async function ProductsPage() {
    const product = await productApi.getAll<{
        products: Product[];
        totalPages: number;
        currentPage: number;
    }>("?page=1");

    const categorias = [
        { nombre: "Anillos", slug: "anillos", categoryId: "68c841d9aa6f123a0efb5c80", icono: "/icons/iconRing.svg" },
        { nombre: "Aretes", slug: "aretes", categoryId: "68c841bfaa6f123a0efb5c7e", icono: "/icons/iconAirrings.svg" },
        { nombre: "Manilla", slug: "manillas", categoryId: "68c841ecaa6f123a0efb5c82", icono: "/icons/iconBracelet.svg" },
        { nombre: "Dijes", slug: "dijes", categoryId: "68c841f1aa6f123a0efb5c84", icono: "/icons/iconCharms.svg" },
        { nombre: "Cadenas", slug: "cadenas", categoryId: "68c841fbaa6f123a0efb5c86", icono: "/icons/iconChains.svg" },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4">
            <ProductsHomeClient categorias={categorias} initialData={product} />
        </section>
    );
}