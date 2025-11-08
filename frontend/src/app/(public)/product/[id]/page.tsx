import { productApi } from "@/services/ProductApi";
import { Product } from "@/types/productsCategory.types";
import ProductDetailClient from "@/components/product/productDetail/productDetailClient";

export default async function ProductDetail({ params }: { params: { id: string } }) {

    const product = await productApi.getById<Product>(params.id)
    // const productrecomendated = await productApi.getRelatedProducts<Product[]>(params.id)



    return (
        <ProductDetailClient product={product} />
    );
}