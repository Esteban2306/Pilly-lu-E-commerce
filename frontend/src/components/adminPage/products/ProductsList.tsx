'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartAdminProduct from "@/components/adminPage/cartAdminProduct/CartAdminProduct";
import { useProducts } from "@/hooks/useProducts/useProducts";
import Link from "next/link";

export default function ProductsList() {

    const { data: products, isLoading, isError } = useProducts();

    if (isLoading) return <p className="text-center mt-10">Cargando productos...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar productos</p>;


    return (
        <div className="p-6 mt-24 mb-30">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                        Exportar
                    </Button>
                    <Link href={'/admin/create'}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5">
                            Añadir Producto
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex justify-between flex-wrap gap-3 mb-8 bg-white shadow-sm border border-gray-200 rounded-2xl px-6 py-4">
                <div className="flex gap-10">
                    <Input
                        placeholder="Buscar producto..."
                        className="w-64 bg-gray-100 rounded-full text-gray-700 placeholder:text-gray-500"
                    />
                    <select className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
                        <option>Todos</option>
                        <option>Footwear</option>
                        <option>Accessories</option>
                        <option>Apparel</option>
                    </select>
                    <select className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
                        <option>Más nuevo</option>
                        <option>Más barato</option>
                        <option>Más caro</option>
                    </select>
                </div>
                <Button className="bg-blue-600 text-white rounded-full px-6 hover:bg-blue-700">
                    Aplicar
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products?.map((p) => (
                    <CartAdminProduct
                        key={p._id}
                        _id={p._id}
                        productName={p.productName}
                        price={p.price}
                        category={
                            typeof p.category === "object" && p.category?.categoryName
                                ? p.category.categoryName
                                : "Sin categoría"}
                        images={p.images}
                        isFeatured={p.isFeatured}
                    />
                ))}
            </div>
        </div>
    );
}
