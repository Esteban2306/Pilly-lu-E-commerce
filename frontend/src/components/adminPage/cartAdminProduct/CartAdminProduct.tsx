'use client';

import { ProductCardProps } from '@/types/product.types';
import useProductFetchImages from '@/hooks/productFetchImages/productFetchImages';
import Image from 'next/image';
import imageProduct from '../../../../public/images/products/productProof.jpg';
import Delete from '@/components/buttons/deleteButton/deleteButton';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditProductPopover from '../editProductPopover/EditProductPopover';
import { useToggleFeaturedProducts } from '@/hooks/useProducts/useProducts';
import { cn } from '@/lib/utils';

export default function CartAdminProduct({
    _id,
    productName,
    price,
    category,
    images,
    isFeatured,
}: ProductCardProps) {
    const { mainImage } = useProductFetchImages(_id);
    const { mutate: toggleFeatured, isPending } = useToggleFeaturedProducts();

    const handleToggle = () => {
        toggleFeatured(_id);
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
            <div className="relative h-[280px] w-full">

                <Button
                    size="icon"
                    variant="ghost"
                    disabled={isPending}
                    onClick={handleToggle}
                    className={cn(
                        "absolute top-3 right-3 z-30 cursor-pointer rounded-full transition-all duration-300 hover:scale-110",
                        isFeatured
                            ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                            : "text-blue-700 hover:text-yellow-400"
                    )}
                >
                    <Star
                        strokeWidth={2}
                        fill={isFeatured ? "currentColor" : "none"}
                        className="w-6 h-6 transition-all duration-300"
                    />
                </Button>

                <EditProductPopover
                    product={{ _id, productName, price, category, images, isFeatured }}
                />

                <Image
                    src={mainImage?.url || imageProduct}
                    alt={productName || 'Imagen del producto'}
                    fill
                    sizes="(max-width: 750px) 80vw, 260px"
                    className="object-cover rounded-2xl"
                />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-lg text-left truncate">{productName}</h3>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm px-2 py-1 bg-blue-100 text-black rounded-full">
                            {typeof category === 'string'
                                ? 'Sin categoría'
                                : category?.categoryName}
                        </span>
                        <p className="text-black font-medium">${price}</p>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <Delete id={_id} />
                </div>
            </div>
        </div>
    );
}
