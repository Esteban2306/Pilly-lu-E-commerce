'use client';

import Image from 'next/image';
import product from '../../../../public/images/products/productProof.jpg';
import cart from '../../../../public/icons/iconCartProduct.png';

export default function ProductGallery() {
    return (
        <div
            className="snap-center flex-shrink-0 max-w-[300px] w-full h-[380px] bg-third rounded-lg shadow-md p-2"
        >
            <div className="relative w-[260]  h-[270px] m-auto pt-2">
                <Image
                    src={product}
                    alt='Producto'

                    className="object-cover rounded-lg h-[270px] "
                />
            </div>
            <div className="relative pt-8 text-center">
                <Image
                    src={cart}
                    alt='carrito para añadir un producto a la cesta'
                    className='absolute size-5.5 z-10 right-2.5 top-10 cursor-pointer'
                />
                <h3 className="font-bold text-[18px] ">Manilla de oro 18k</h3>
                <p className="text-gray-700">$170.000</p>
            </div>
        </div>
    )
}