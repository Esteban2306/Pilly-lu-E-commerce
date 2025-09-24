import ProductGallery from "@/components/product/productGallery/productGallery";
import ButtonCountCart from "@/components/buttons/buttonCountCart/buttonCountCart";
import ButtonDescriptionProduct from "@/components/buttons/buttonDescriptionProduct/buttonDescriptionProduct";
import ColageProcut from "@/components/product/collageProduct/collageProduct";
import { productApi } from "@/services/ProductApi";
import { Product } from "@/types/productsCategory.types";

import ButtonAddItemToCart from "@/components/buttons/buttonAddItemToCart/buttonAddItemtoCart";

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const product = await productApi.getById<Product>(params.id)
    const productrecomendated = await productApi.getAll<Product[]>()
    return (
        <section className="max-w-5xl mx-auto px-4 py-8 mt-18" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ColageProcut id={params.id} />
                <div>
                    <h1 className="text-4xl font-bold">{product.productName}</h1>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-500 font-bold line-through text-lg">$140.000</span>
                        <span className="text-black font-bold text-2xl">{product.price}</span>
                        <p className="text-sm text-gray-600">Impuesto incluido</p>
                    </div>
                    <p className="mt-2 font-bold">Color: <span className="font-semibold">Gold</span></p>

                    <div className="flex gap-10 ">
                        <ButtonCountCart />
                        <ButtonAddItemToCart productId={product._id} />
                    </div>

                    <div className="mt-6">
                        <ButtonDescriptionProduct description={product.description} />
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold">Tiempo de entrega</h3>
                        <p className="text-gray-700">2-5 días hábiles</p>
                    </div>

                    <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded">
                        Consultar por WhatsApp
                    </button>
                </div>
            </div>

            <div className=" 
                    grid 
                    justify-center 
                    gap-4 
                    mt-20 mb-18
                    [grid-template-columns:repeat(1,280px)]
                    sm:[grid-template-columns:repeat(2,280px)]
                    lg:[grid-template-columns:repeat(3,280px)]">
                {productrecomendated.map((p) => (
                    <ProductGallery
                        key={p._id}
                        _id={p._id}
                        productName={p.productName}
                        price={p.price}
                        images={p.images}
                    />
                ))}


            </div>
        </section>
    );
}