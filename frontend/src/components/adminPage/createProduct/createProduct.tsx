'use client'

import React, { useState, useEffect } from "react"
import ProductImageUploader from "@/components/buttons/buttonUploadthing/buttonUploadthing"
import { productApi } from "@/services/ProductApi"
import Image from "next/image"
import iconImage from '../../../../public/icons/iconImage.png'
import iconSettings from '../../../../public/icons/iconSettings.png'
import iconAtention from '../../../../public/icons/iconAtention.png'
import { categoryApi } from "@/services/CategoryApi"
import { CategoryType, Img } from "./types"
import Link from "next/link"

export default function CreateProduct() {
    const [images, setImages] = useState<Img[]>([]);
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState<CategoryType[]>([])

    const handleImage = (urls: string[]) => {
        setImages(prev => [...prev, ...urls.map(u => ({ url: u, isMain: false }))]);
    }

    const setAsMain = (url: string) => {
        setImages(prev => prev.map(img => ({ ...img, isMain: img.url === url })));
    }

    const removeImage = (url: string) => {
        setImages(prev => prev.filter(i => i.url !== url));
    };

    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData(e.currentTarget);


        const product = {
            productName: formData.get("productName") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            category: formData.get("category") as string,
            color: formData.get("color") as string,
            material: formData.get("material") as string,
            offer: formData.get("offer") as string,
            status: formData.get("status") as string,
            stock: Number(formData.get("stock")),
            images,
            isFeatured: formData.get("isFeatured") === 'true'
        }

        try {
            const data = await productApi.create(product)
            setImages([])
            window.location.reload()
        } catch (err) {
            console.error("Error creando producto: ", err)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        async function fetchCategory() {
            const responseCategory: Array<CategoryType> = await categoryApi.getCategory()
            setCategory(responseCategory)
        }
        fetchCategory()
    }, [])


    return (
        <form className="space-y-8" aria-label="Create new product form" onSubmit={handleCreateProduct}>
            <section aria-labelledby="main-details" className="bg-white p-6 rounded-2xl shadow-lg">
                <fieldset>
                    <legend id="main-details" className="font-semibold text-gray-900">
                        <Image src={iconSettings} alt="icon" width={20} height={20} className="inline w-5 h-5 mr-2 mb-1" />
                        Detalles principales del producto
                    </legend>

                    <div className="grid gap-6 mt-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                Nombre del producto
                            </label>
                            <input
                                id="product-name"
                                name="productName"
                                type="text"
                                placeholder="e.g., Anillo Clásico de Compromiso"
                                required
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-secondary"
                            />
                        </div>

                        <div>
                            <label htmlFor="product-type" className="block text-sm font-medium text-gray-700">
                                Tipo de producto
                            </label>
                            <select
                                id="product-type"
                                name="category"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                                defaultValue="Aretes"
                            >
                                {category.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-6 mt-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="material" className="text-sm font-medium text-gray-700">
                                Material
                            </label>
                            <select
                                id="material"
                                name="material"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                                defaultValue="gold"
                            >
                                <option value="gold">Oro laminado 18K</option>
                                <option value="silver">Plata ley 9f25</option>
                                <option value="bronce">Bronce</option>
                                <option value="acero">Acero rodinado</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Precio
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="$ 200.000"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 mt-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                Color
                            </label>
                            <input
                                id="color"
                                name="color"
                                type="text"
                                placeholder="e.g., Oro Rosado"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                            />
                        </div>

                        <div>
                            <label htmlFor="offer" className="block text-sm font-medium text-gray-700">
                                Oferta <span className="text-gray-400 text-xs">(Opcional)</span>
                            </label>
                            <input
                                id="offer"
                                name="offer"
                                type="text"
                                placeholder="e.g., 10% o $ 20.000"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Escriba una descripción detallada..."
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                            Utilice de 2 a 4 párrafos cortos. Incluya instrucciones de cuidado y notas sobre tallas.
                        </p>
                    </div>
                </fieldset>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-lg">
                <legend className="font-semibold text-gray-900 mb-5 ">
                    <Image src={iconImage} alt="icon" width={20} height={20} className="inline w-5 h-5 mr-2 mb-1" />
                    Imágenes del producto
                </legend>

                <div className="flex justify-center gap-8">
                    <fieldset className="flex flex-col space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Imagen principal</label>
                        <ProductImageUploader
                            onUploadComplete={handleImage}
                            onRemove={removeImage}
                            onSetMain={setAsMain}
                            isMain={images.find(img => img.isMain)?.url === images[0]?.url}
                        />
                    </fieldset>

                    <fieldset className="flex flex-col space-y-2">
                        <legend className="text-sm font-medium text-gray-700">Imágenes adicionales</legend>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <ProductImageUploader
                                    key={i}
                                    onUploadComplete={handleImage}
                                    onRemove={removeImage}
                                    onSetMain={setAsMain}
                                />
                            ))}
                        </div>
                    </fieldset>
                </div>
            </section>

            <section aria-labelledby="visibility-status" className="bg-white p-6 rounded-2xl shadow-lg">
                <fieldset>
                    <legend id="visibility-status" className="font-semibold text-gray-900">
                        <Image src={iconAtention} alt="icon" width={20} height={20} className="inline w-5 h-5 mr-2 mb-1" />
                        Visibility & Status
                    </legend>

                    <div className="grid gap-6 mt-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                                defaultValue="published"
                            >
                                <option value="draft">Borrador</option>
                                <option value="published">Publicar</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Producto Destacado
                            </label>
                            <select
                                id="isFeatured"
                                name="isFeatured"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                                defaultValue="false"
                            >
                                <option value="true">destacar</option>
                                <option value="false">predetermiando</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                Inventario SKU <span className="text-gray-400 text-xs">(Opcional)</span>
                            </label>
                            <input
                                id="sku"
                                name="sku"
                                type="text"
                                placeholder="e.g., JR-CL-001"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                            />
                        </div>

                        <div>
                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                    </div>
                </fieldset>
            </section>

            <div className="flex justify-end gap-4">
                <Link href={'/admin/dashboard'}>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                </Link>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-secondary rounded-lg hover:bg-third cursor-pointer"
                >
                    {loading ? 'creando...' : 'crear Producto'}
                </button>
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-primary"
                >
                    Guardar Borrador
                </button>
            </div>
        </form>
    )
}