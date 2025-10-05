'use client'

import { ProductCardProps } from '@/types/product.types';
import useProductFetchImages from '@/hooks/productFetchImages/productFetchImages';
import Image from 'next/image';
import imageProduct from '../../../../public/images/products/productProof.jpg';
import Delete from '@/components/buttons/deleteButton/deleteButton';
import { FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartAdminProduct({ _id, productName, price, category }: ProductCardProps) {

    const { mainImage } = useProductFetchImages(_id);


    return (
        <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">

            <div className="relative h-[280px] w-full">
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm cursor-pointer"
                >
                    <FileEdit className="w-4 h-4 text-gray-700" />
                </Button>

                <Image
                    src={mainImage?.url || imageProduct}
                    alt={productName || "Imagen del producto"}
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
                            {typeof category === "string" ? "Sin categoría" : category?.categoryName}
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
