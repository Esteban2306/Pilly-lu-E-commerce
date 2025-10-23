'use client';

import Image from 'next/image';
import Link from 'next/link';
import product from '../../../../public/images/products/productProof.jpg';
import { CartIcon } from "../../icons/NavBar/navBarIconCart";
import { ProductCardProps } from '@/types/product.types';
import useProductFetchImages from '@/hooks/productFetchImages/productFetchImages';
import { CometCard } from '@/components/ui/comet-card';
import { useCart } from '@/context/cartContext';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat/useCurrencyFormat';
import { useEffect, useState } from 'react';

export default function ProductGallery({
    _id,
    productName,
    price,
    offer,
    stock,
    status
}: ProductCardProps) {

    const { mainImage } = useProductFetchImages(_id);
    const { addToCart } = useCart();
    const { formatCurrency } = useCurrencyFormat();

    const badges = [
        status === 'nuevo' ? 'Nuevo' : null,
        offer ? offer : null,
        stock !== undefined && stock < 5 ? 'Poco stock' : null
    ].filter(Boolean) as string[];

    const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

    useEffect(() => {
        if (badges.length > 1) {
            const interval = setInterval(() => {
                setCurrentBadgeIndex((prev) => (prev + 1) % badges.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [badges]);

    const getBadgeStyle = (badge: unknown) => {
        if (typeof badge !== 'string') badge = String(badge || '');
        const lower = (badge as string).toLowerCase();

        if (lower.includes('nuevo')) return 'bg-blue-100 text-blue-300 border-blue-300';
        if (lower.includes('%') || lower.includes('oferta')) return 'bg-sky-100 text-sky-700 border-sky-300';
        if (lower.includes('poco')) return 'bg-amber-100 text-amber-700 border-amber-300';
        return 'bg-gray-100 text-gray-700 border-gray-300';
    };

    return (
        <CometCard>
            <div className="snap-center flex-shrink-0 max-w-[280px] w-full bg-sky-100 rounded-3xl shadow-sm 
                hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden relative">

                <div className="relative w-[260px] h-auto aspect-[7/6] m-auto overflow-hidden mt-2">
                    <Link href={`/product/${_id}`}>
                        <Image
                            src={mainImage?.url || product}
                            alt={productName || 'Imagen del producto'}
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </Link>

                    {badges.length > 0 && (
                        <div
                            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border 
                                        backdrop-blur-sm shadow-sm transition-all duration-500 ${getBadgeStyle(badges[currentBadgeIndex])}`}
                        >
                            {formatCurrency(badges[currentBadgeIndex])}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between p-3 text-left bg-white rounded-2xl max-w-60 m-auto mb-3 mt-3  ">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-[15px] truncate leading-tight mb-1">
                            <Link href={`/product/${_id}`}>
                                {productName}
                            </Link>
                        </h3>

                        <p className="text-gray-500 text-[13px] mb-2">
                            {stock && stock < 5 ? 'Bajo stock' : 'En stock'}
                        </p>

                        <div className="flex items-center gap-2">
                            <p className="text-[16px] font-bold text-gray-900">
                                {formatCurrency(price)}
                            </p>
                            {offer && (
                                <span className="text-gray-400 text-[13px] line-through">
                                    {formatCurrency(price + price * 0.15)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-9">
                        <button onClick={() => addToCart(_id, 1)}>
                            <CartIcon className="size-6 cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>
        </CometCard>
    );
}