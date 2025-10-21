'use client'

import CartAdminProduct from "@/components/adminPage/adminPageInfo/products/cartAdminProduct/CartAdminProduct";
import { useProducts } from "@/hooks/useProducts/useProducts";
import { useState } from "react";
import ProductListFilter from "./productListFilter";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";
import Link from "next/link";
import ArrowButton from "@/components/buttons/buttonOpenAnimation/buttonOpenAnimation";

export default function ProductsList() {

    const initialFilters = {
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "newest",
    }

    const [searchFilters, setSearchFilters] = useState("")
    const [filters, setFilters] = useState(initialFilters)

    const debouncedSearch = useDebounce(searchFilters, 600)

    const debouncedFilters = {
        ...filters,
        search: debouncedSearch,
    }

    const { data: products, isLoading, isError } = useProducts(debouncedFilters);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleResetFilters = () => {
        setFilters(initialFilters)
        setSearchFilters("")
    }

    if (isLoading) return <p className="text-center mt-10">Cargando productos...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar productos</p>;

    return (
        <div className="p-6 mt-24 mb-30">
            <div className="flex justify-between">
                <h2 className="font-black text-3xl mb-6">
                    Productos
                </h2>

                <Link href={'/admin/create'}>
                    <ArrowButton
                        text="Crear Producto"
                        textColor="#000000"
                        buttonOverlayColor='#96BAE0'
                        borderColor="#96BAE0"
                        className="w-34"
                    />
                </Link>
            </div>

            <ProductListFilter
                searchValue={searchFilters}
                onSearchChange={setSearchFilters}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
            />

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
                        color={p.color}
                        offer={p.offer}
                        stock={p.stock}
                        status={p.status}
                        description={p.description}
                        sku={p.sku}
                    />
                ))}
            </div>
        </div>
    );
}
