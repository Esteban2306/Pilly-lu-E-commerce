import iconImage from '../../../public/icons/iconImage.png'
import iconSettings from '../../../public/icons/iconSettings.png'
import iconAtention from '../../../public/icons/iconAtention.png'
import Image from 'next/image';

export default function adminPage() {
    return (
        <main className="p-8 mt-16 bg-gray-50 min-h-screen">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Create Product</h1>
            </header>

            <form className="space-y-8" aria-label="Create new product form">
                <section aria-labelledby="main-details" className="bg-white p-6 rounded-2xl shadow-lg">
                    <fieldset>
                        <legend id="main-details" className="font-semibold text-gray-900">
                            <Image src={iconSettings} alt="Attention icon" className="inline w-5 h-5 mr-2 mb-1" />
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
                                    placeholder="e.g., Anillo Clasico de Compromiso"
                                    required
                                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-secondary  "
                                />
                            </div>

                            <div>
                                <label htmlFor="product-type" className="block text-sm font-medium text-gray-700">
                                    Tipo de producto
                                </label>
                                <select
                                    id="product-type"
                                    name="productType"
                                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:ring-2 focus:ring-secondary"
                                    defaultValue="Aretes"
                                >
                                    <option value="Aretes">Aretes</option>
                                    <option value="Anillos">Anillos</option>
                                    <option value="Manilla">Manilla</option>
                                    <option value="Dijes">Dijes</option>
                                    <option value="Cadeas">Cadeas</option>
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
                                    <option value="silver">Plata ley 925</option>
                                    <option value="Bronce">Bronce</option>
                                    <option value="Acero">Acero rodinado</option>
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
                        <Image src={iconImage} alt="Attention icon" className="inline w-5 h-5 mr-2 mb-1" />
                        Imagenes del producto
                    </legend>
                    <div className="flex items-start gap-60 ml-40" aria-label="Product images upload form">
                        <fieldset className="flex flex-col space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Imagen principal</label>

                            <div className="flex items-center gap-4 hover:border-purple-400 transition">
                                <label
                                    htmlFor="main-image"
                                    className="size-60 text-[10px] text-gray-400 cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-secondary transition"
                                >
                                    Arrastra tu imagen aquí
                                </label>
                                <input id="main-image" type="file" className="hidden" />
                            </div>

                            <p className="text-[11px] text-gray-400">JPG, PNG up to 10MB</p>
                        </fieldset>

                        {/* Imágenes adicionales */}
                        <fieldset className="flex flex-col space-y-2">
                            <legend className="flex items-center justify-between gap-2">
                                <span className="block text-sm font-medium text-gray-700">Imagenes adicionales</span>
                                <span className="text-[11px] text-gray-400">Opcional</span>
                            </legend>

                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <label
                                        key={i}
                                        htmlFor={`additional-image-${i}`}
                                        className="size-40 border-2 border-dashed rounded-md flex items-center justify-center text-gray-400 text-lg cursor-pointer hover:border-secondary transition"
                                    >
                                        +
                                        <input id={`additional-image-${i}`} type="file" className="hidden" />
                                    </label>
                                ))}
                            </div>

                            <p className="text-[11px] text-gray-400">
                                Sube hasta tres ángulos o fotografías.
                            </p>
                        </fieldset>
                    </div>
                </section>

                <section aria-labelledby="visibility-status" className="bg-white p-6 rounded-2xl shadow-lg">
                    <fieldset>
                        <legend id="visibility-status" className="font-semibold text-gray-900">
                            <Image src={iconAtention} alt="Attention icon" className="inline w-5 h-5 mr-2 mb-1" />
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

                            {/* SKU */}
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
                        </div>
                    </fieldset>
                </section>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-secondary rounded-lg hover:bg-third"
                    >
                        Crear Producto
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-primary"
                    >
                        Guardar Borrador
                    </button>
                </div>
            </form>
        </main>
    );
}