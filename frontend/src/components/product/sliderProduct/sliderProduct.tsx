"use client"

import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { Swiper as SwiperType } from "swiper"
import ProductGallery from "@/components/product/productGallery/productGallery"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { ProductCardProps } from "@/types/product.types"
import { productApi } from "@/services/ProductApi"

export default function SliderProduct() {
    const swiperRef = useRef<SwiperType | null>(null)
    const [featured, setFeatured] = useState<ProductCardProps[]>([])

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await productApi.getFeatured<ProductCardProps[]>()
                setFeatured(response)
            } catch (error) {
                console.error("Error fetching featured products:", error)
            }
        }
        fetchFeaturedProducts()
    }, [])

    useEffect(() => {
        if (!featured.length) return
        const mid = Math.floor(featured.length / 2)
        setTimeout(() => {
            ; (swiperRef.current as any)?.slideToLoop?.(mid, 0)
        }, 50)
    }, [featured])

    const initialSlide = featured.length ? Math.floor(featured.length / 2) : 0

    return (
        <div className="w-full py-10 flex flex-col items-center">
            <h1 className="text-center text-3xl font-bold mb-10 text-gray-800">
                Productos destacados
            </h1>
            {featured.length > 0 && (
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    autoHeight={true}
                    observer={true}
                    observeParents={true}
                    grabCursor={true}
                    loop={featured.length > 3}
                    centeredSlides={true}
                    initialSlide={initialSlide}
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    modules={[Pagination]}
                    className="max-w-[1000px] w-full mx-auto"
                >
                    {featured.map((p) => (
                        <SwiperSlide
                            key={p._id}
                            className="h-auto flex justify-center items-start"
                        >
                            <div className="w-full">
                                <ProductGallery {...p} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <div className="flex items-center gap-4 mt-6">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* coincide con el el en pagination */}
                <div className="custom-pagination swiper-pagination flex justify-center" />

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    )
}