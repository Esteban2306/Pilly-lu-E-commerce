
import Image from 'next/image';
import Link from 'next/link';
import product from '../../../../public/images/products/productProof.jpg';
import { CartIcon } from "../../icons/NavBar/navBarIconCart";

export default function ProductGallery() {
    return (
        <div
            className="snap-center flex-shrink-0 max-w-[300px] w-full h-[380px] bg-third rounded-lg shadow-md p-2"
        >
            <div className="relative w-[260]  h-[270px] m-auto pt-2">
                <Link href={'/product'}>
                    <Image
                        src={product}
                        alt='Producto'

                        className="object-cover rounded-lg h-[270px] "
                    />
                </Link>
            </div>
            <div className="relative pt-8 text-center">
                <CartIcon className='absolute size-5.5 z-10 right-2.5 top-10 cursor-pointer' />
                <h3 className="font-bold text-[18px] ">
                    <Link href={'/product'}>
                        Manilla de oro 18k
                    </Link>
                </h3>
                <p className="text-gray-700">
                    <Link href={'/product'}>
                        $170.000
                    </Link>
                </p>
            </div>
        </div>
    )
}