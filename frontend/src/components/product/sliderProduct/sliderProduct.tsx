"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import ProductGallery from "@/components/product/productGallery/productGallery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetFeaturedProducts } from "@/hooks/useProducts/useProducts";

import SliderProductSkeleton from "./SliderProductSkeleton";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader/useSkeletonLoader";

type SwiperWithLoop = SwiperType & {
    slideToLoop?: (index: number, speed?: number, runCallbacks?: boolean) => void;
};

export default function SliderProduct() {
    const swiperRef = useRef<SwiperWithLoop | null>(null);

    const { data, isLoading, isError } = useGetFeaturedProducts();

    const featured = data || [];

    const showSkeleton = useSkeletonLoader(isLoading);

    useEffect(() => {
        if (!featured.length) return;
        const mid = Math.floor(featured.length / 3);

        setTimeout(() => {
            swiperRef.current?.slideToLoop?.(mid, 0);
        }, 50);
    }, [featured]);

    const initialSlide = featured.length ? Math.floor(featured.length / 3) : 0;

    if (showSkeleton) return <SliderProductSkeleton />;

    if (isError) {
        return (
            <div className="text-center py-20 text-red-600 font-semibold">
                Error cargando productos destacados
            </div>
        );
    }

    return (
        <div className="w-full py-10 flex flex-col items-center">
            <h1 className="text-center text-3xl font-bold mb-10 text-gray-800">
                Productos destacados
            </h1>

            {featured.length > 0 && (
                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
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
                    className="w-full mx-auto"
                >
                    {featured.map((p) => (
                        <SwiperSlide key={p._id} className="flex justify-center items-start">
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

                <div className="custom-pagination swiper-pagination flex justify-center" />

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}