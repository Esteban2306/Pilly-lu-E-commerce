'use client'

import { useState } from "react"
import Image from "next/image";
import productProof from '../../../../public/images/products/productProof.jpg'
import productProofTwo from '../../../../public/images/products/productProofTwo.jpg'
import productProoftrhee from '../../../../public/images/products/productProoftrhee.jpg'
import productProofFourth from '../../../../public/images/products/productProofFourth.jpg'
import { ImageType } from "./galeryProductType";



export default function collageProduct() {

    const images = [
        productProof,
        productProofTwo,
        productProofFourth,
        productProoftrhee
    ]
    const [principalImage, serPrincipalImage] = useState<ImageType>(images[0])
    const [thumblnais, setthumblnais] = useState<ImageType[]>(images.slice(1))

    const handleSwap = (clicked: ImageType) => {
        const newThumbnails: ImageType[] = []

        thumblnais.forEach((t) => {
            if (t !== clicked) {
                newThumbnails.push(t)
            } else {
                newThumbnails.push(principalImage)
            }
        });

        setthumblnais(newThumbnails);
        serPrincipalImage(clicked);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3 max-w-[460px] mx-auto">
            <div className="rounded-lg overflow-hidden">
                <Image
                    src={principalImage}
                    alt="vista grande de producto"
                    className=" object-cover size-92"
                />
            </div>
            <div className="flex md:flex-col gap-4">
                {thumblnais.map((thumb, index) => (
                    <div
                        key={typeof thumb === 'string' ? thumb : index}
                        className="rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 hover:animate-scale hover:animate-duration-200"
                        onClick={() => handleSwap(thumb)}
                    >
                        <Image
                            src={thumb}
                            alt="Vista 1"
                            className=" object-cover size-28"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}