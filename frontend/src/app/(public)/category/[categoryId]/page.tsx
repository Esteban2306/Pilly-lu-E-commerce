import { productApi } from "@/services/ProductApi"
import ProductGallery from "@/components/product/productGallery/productGallery"
import { Category, Product } from "@/types/productsCategory.types";


export default async function productIdPage({ params }: { params: { categoryId: string } }) {

    const { category, products } = await productApi.getByCategory<{ category: Category; products: Product[] }>(params.categoryId)

    if (!products.length) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Categoría vacía</h1>
                <p>No hay productos en esta categoría todavía.</p>
            </main>
        );
    }

    return (<main className='min-h-screen'>
        <div className="flex justify-center mt-28">
            <h1 className="text-4xl font-medium mb-4 h-c">{category.categoryName}</h1>
        </div>
        <div className="
                    grid 
                    justify-center 
                    gap-4 
                    mt-20 mb-18
                    [grid-template-columns:repeat(1,280px)]
                    sm:[grid-template-columns:repeat(2,280px)]
                    lg:[grid-template-columns:repeat(3,280px)]
                ">
            {products.map((p) => (
                <ProductGallery
                    key={p._id}
                    _id={p._id}
                    productName={p.productName}
                    price={p.price}
                    images={p.images}
                />
            ))}
        </div>
    </main>
    )
}