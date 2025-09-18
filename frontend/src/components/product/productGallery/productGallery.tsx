
import Image from 'next/image';
import Link from 'next/link';
import product from '../../../../public/images/products/productProof.jpg';
import { CartIcon } from "../../icons/NavBar/navBarIconCart";
import { productApi } from '@/services/ProductApi';
import { ProductCardProps } from '@/types/product.types';

export default function ProductGallery({ _id, productName, price, images = [] }: ProductCardProps) {
    return (
        <div
            className="snap-center flex-shrink-0 max-w-[300px] w-full h-[380px] bg-third rounded-lg shadow-md p-2"
        >
            <div className="relative w-[260]  h-[270px] m-auto pt-2">
                <Link href={`/product/${_id}`}>
                    <Image
                        src={images?.[0]?.url || product}
                        alt={productName}

                        className="object-cover rounded-lg h-[270px] "
                    />
                </Link>
            </div>
            <div className="relative pt-8 text-center">
                <CartIcon className='absolute size-5.5 z-10 right-2.5 top-10 cursor-pointer' />
                <h3 className="font-bold text-[18px] ">
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
    )
}