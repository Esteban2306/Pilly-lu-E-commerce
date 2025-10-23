'use client'

import { useState, useEffect } from "react"
import Image from "next/image";
import productProof from '../../../../public/images/products/productProof.jpg'
import productProofTwo from '../../../../public/images/products/productProofTwo.jpg'
import productProoftrhee from '../../../../public/images/products/productProoftrhee.jpg'
import productProofFourth from '../../../../public/images/products/productProofFourth.jpg'
import { ImageType } from "./galeryProductType";
import useProductFetchImages from '@/hooks/productFetchImages/productFetchImages';


export default function CollageProduct({ id }: { id: string }) {

    const { imagesByUrl, isLoading, mainImage } = useProductFetchImages(id)

    const images = [
        productProof,
        productProofTwo,
        productProofFourth,
        productProoftrhee
    ]

    const [principalImage, setPrincipalImage] = useState<ImageType>(images[0])
    const [thumblnais, setThumbnails] = useState<ImageType[]>(images.slice(1))

    useEffect(() => {
        if (imagesByUrl.length > 0) {
            setPrincipalImage(mainImage?.url || productProof);
            setThumbnails(imagesByUrl.filter(img => img.url !== mainImage?.url).map(img => img.url));
        }
    }, [imagesByUrl, mainImage]);


    const handleSwap = (clicked: ImageType) => {
        const newThumbnails: ImageType[] = []

        thumblnais.forEach((t) => {
            if (t !== clicked) {
                newThumbnails.push(t)
            } else {
                newThumbnails.push(principalImage)
            }
        });

        setThumbnails(newThumbnails);
        setPrincipalImage(clicked);
    }

    if (isLoading) {
        return <p className="text-center text-gray-400 mt-10">Cargando imágenes...</p>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3 max-w-[460px] mx-auto">
            <div className="rounded-lg overflow-hidden">
                <Image
                    src={principalImage}
                    alt="vista grande de producto"
                    width={368}
                    height={368}
                    className=" object-cover size-92 rounded-lg"
                />
            </div>
            <div className="flex md:flex-col gap-4">

                {thumblnais.map((thumb, index) => (
                    <div key={typeof thumb === 'string' ? thumb : (thumb?.src || index)} onClick={() => handleSwap(thumb)}
                        className="rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 hover:animate-scale hover:animate-duration-200"
                    >
                        <Image
                            src={thumb}
                            alt={`Vista ${index + 1}`}
                            width={92}
                            height={92}
                            className="object-cover size-28"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}