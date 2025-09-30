'use client';

import Image from 'next/image';
import Link from 'next/link';
import product from '../../../../public/images/products/productProof.jpg';
import { CartIcon } from "../../icons/NavBar/navBarIconCart";
import { ProductCardProps } from '@/types/product.types';
import useProductFetchImages from '@/hooks/productFetchImages/productFetchImages';
import { CometCard } from '@/components/ui/comet-card';
import { useCart } from '@/context/cartContext';

export default function ProductGallery({ _id, productName, price }: ProductCardProps) {
    const { mainImage, isLoading } = useProductFetchImages(_id)
    const { addToCart } = useCart();

    return (
        <CometCard>
            <div
                className="snap-center flex-shrink-0 max-w-[300px] w-full h-[380px] bg-third rounded-lg shadow-md p-2"
            >
                <div className="relative w-[260]  h-[270px] m-auto pt-2">
                    <Link href={`/product/${_id}`}>
                        <Image
                            src={mainImage?.url || product}
                            alt={productName || "Imagen del producto"}
                            fill
                            sizes="(max-width: 768px) 100vw, 260px"
                            className="object-cover rounded-lg"
                        />


                    </Link>
                </div>
                <div className="relative pt-2 text-center">
                    <button
                        onClick={() => addToCart(_id, 1)}
                    >
                        <CartIcon className='absolute size-5.5 z-10 -right-1 top-10 cursor-pointer' />
                    </button>
                    <h3 className="font-bold text-[18px] max-w-[220px] truncate mx-auto">
                        <Link href={`/product/${_id}`}>
                            {productName}
                        </Link>
                    </h3>
                    <p className="text-gray-700">
                        <Link href={`/product/${_id}`}>
                            {price}
                        </Link>
                    </p>
                </div>
            </div>
        </CometCard>
    )
}