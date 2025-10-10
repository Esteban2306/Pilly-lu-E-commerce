'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartAdminProduct from "@/components/adminPage/cartAdminProduct/CartAdminProduct";
import { useProducts, useGetCategory } from "@/hooks/useProducts/useProducts";
import Link from "next/link";
import { useState } from "react";

export default function ProductsList() {

    const [tempSearch, setTempSearch] = useState({
        search: '',
        category: '',
        sortBy: ''
    })

    const [filters, setFilters] = useState({
        search: '',
        category: '',
        sortBy: ''
    })

    const { data: products, isLoading, isError } = useProducts(filters);
    const { data: category } = useGetCategory();


    if (isLoading) return <p className="text-center mt-10">Cargando productos...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar productos</p>;



    return (
        <div className="p-6 mt-24 mb-30">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
                <div className="flex gap-3">
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
                        value={tempSearch.search}
                        onChange={(e) => setTempSearch({ ...filters, search: e.target.value })}

                        className="w-64 bg-gray-100 rounded-full text-gray-700 placeholder:text-gray-500"
                    />
                    <select
                        value={tempSearch.category}
                        onChange={(e) => setTempSearch({ ...filters, category: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-300 block w-20 p-2.5">
                        <option value={''}>Todos</option>
                        {category?.map(cat => (
                            <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                        ))}
                    </select>
                    <select
                        value={tempSearch.sortBy}
                        onChange={(e) => setTempSearch({ ...filters, sortBy: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-300 block w-26 p-2.5"
                    >
                        <option value={''}>Más nuevo</option>
                        <option value={'price_asc'}>Más barato</option>
                        <option value={'price_desc'}>Más caro</option>
                    </select>
                </div>
                <Button
                    onClick={() => setFilters(tempSearch)}
                    className="bg-blue-600 text-white rounded-full px-6 hover:bg-blue-700">
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
                        category={p.category}
                        images={p.images}
                        isFeatured={p.isFeatured}
                    />
                ))}
            </div>
        </div>
    );
}
