import ProductGallery from "@/components/product/productGallery/productGallery";
import ButtonCountCart from "@/components/buttons/buttonCountCart/buttonCountCart";
import ButtonDescriptionProduct from "@/components/buttons/buttonDescriptionProduct/buttonDescriptionProduct";
import ColageProcut from "@/components/product/collageProduct/collageProduct";


export default function ProductDetail() {
    return (
        <section className="max-w-5xl mx-auto px-4 py-8 mt-18" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ColageProcut />
                <div>
                    <h1 className="text-4xl font-bold">Manilla de oro 18k</h1>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-500 font-bold line-through text-lg">$180.000</span>
                        <span className="text-black font-bold text-2xl">$140.000</span>
                        <p className="text-sm text-gray-600">Impuesto incluido</p>
                    </div>
                    <p className="mt-2 font-bold">Color: <span className="font-semibold">Gold</span></p>

                    <div className="flex gap-10 ">
                        <ButtonCountCart />
                        <button className="mt-4 bg-secondary hover:bg-[#7CA6D3] text-black px-4 py-2 rounded">
                            Agregar al carrito
                        </button>
                    </div>

                    <div className="mt-6">
                        <ButtonDescriptionProduct />
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
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
            </div>
        </section>
    );
}