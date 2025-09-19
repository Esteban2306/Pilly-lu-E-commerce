'use client'

import { productApi } from '@/services/ProductApi';
import { useEffect, useState } from 'react';
import { getImagesUrlResponse } from '@/types/getImageUrl.types';

const useProductFetchImages = (productId: string) => {
    const [imagesByUrl, setImagesByUrl] = useState<getImagesUrlResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const imagesUrl = await productApi.getImagesByProductId<getImagesUrlResponse[]>(productId)
                setImagesByUrl(imagesUrl)
            } finally {
                setIsLoading(false)
            }

        }
        fetchImages()
    }, [])

    const mainImage: getImagesUrlResponse | undefined = imagesByUrl?.find(img => img.isMain)

    return { imagesByUrl, isLoading, mainImage }
}

export default useProductFetchImages