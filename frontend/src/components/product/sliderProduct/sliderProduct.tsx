"use client"

import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { Swiper as SwiperType } from "swiper"
import ProductGallery from "@/components/product/productGallery/productGallery"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SliderProduct() {
    const swiperRef = useRef<SwiperType>(null)

    return (
        <div className="w-full py-10 flex flex-col items-center">
            <h1 className="text-center text-3xl font-bold mb-10 text-gray-800">
                Productos destacados
            </h1>

            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper
                }}
                grabCursor={true}
                loop={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={2}
                pagination={{ clickable: true, el: '.swiper-pagination' }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                modules={[Pagination]}
                className="max-w-6xl mx-auto m-auto"
            >
                {[...Array(8)].map((_, i) => (
                    <SwiperSlide key={i}>
                        <ProductGallery />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex items-center gap-4 mt-6">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <ChevronLeft size={18} />
                </button>
                <div className="custom-pagination flex justify-center" />
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
