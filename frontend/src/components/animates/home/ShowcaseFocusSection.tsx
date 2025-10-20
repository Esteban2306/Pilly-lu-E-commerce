"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import rings from '../../../../public/images/home/ringshome.jpg';
import dijes from '../../../../public/images/home/favDijes.png'
import earrings from '../../../../public/images/home/earrings.jpg';

export default function ShowcaseFocusSection() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <>


            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 m-auto w-[95%]">
                <div
                    onMouseEnter={() => setHovered(0)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                        "relative md:col-span-2 h-[300px] sm:h-[500px] md:h-[700px] lg:h-[700px] rounded-lg overflow-hidden transition-all duration-500 ease-out",
                        hovered === 0 ? "scale-[1.03] brightness-110 shadow-xl" : "",
                        hovered !== null && hovered !== 0 ? "blur-sm scale-[0.98]" : ""
                    )}
                >
                    <Image
                        src={rings}
                        alt="anillos dorados sobre fondo claro"
                        fill
                        className="object-cover rounded-lg transition-transform duration-500"
                    />

                    <span className="absolute bottom-10 left-6 sm:bottom-12 sm:left-10 md:bottom-16 md:left-16 text-black w-auto text-start text-lg sm:text-xl md:text-2xl font-semibold z-10">
                        <Link
                            href="/products"
                            className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%]"
                        >
                            Nuevas colecciones.
                        </Link>
                    </span>

                    <span className="font-[var(--font-plus-jakarta)] absolute bottom-4 left-6 sm:bottom-6 sm:left-10 md:bottom-8 md:left-16 text-black text-sm sm:text-base md:text-lg text-start z-10 max-w-sm">
                        Descubre el detalle que transforma tu esencia.
                    </span>
                </div>

                <div className="grid grid-rows-2 gap-4 h-[600px] sm:h-[700px] md:h-[700px]">
                    <div
                        onMouseEnter={() => setHovered(1)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                            "relative h-full rounded-lg overflow-hidden transition-all duration-500 ease-out",
                            hovered === 1 ? "scale-[1.03] brightness-110 shadow-xl" : "",
                            hovered !== null && hovered !== 1 ? "blur-sm scale-[0.98]" : ""
                        )}
                    >
                        <Image
                            src={dijes}
                            alt="Dijes dorados en exhibición"
                            fill
                            className="object-cover rounded-lg transition-transform duration-500"
                        />
                        <span className="absolute top-6 left-6 sm:left-10 md:left-16 lg:left-6 text-black text-lg sm:text-xl md:text-2xl font-semibold z-10">
                            <Link
                                href="/products"
                                className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%]"
                            >
                                Dijes.
                            </Link>
                        </span>
                        <span className="font-[var(--font-plus-jakarta)] absolute top-16 left-6 sm:left-10 md:left-16 lg:left-6 text-black text-sm sm:text-base md:text-lg z-10 max-w-[210px]">
                            Cada pieza, una parte de ti.
                        </span>
                    </div>

                    <div
                        onMouseEnter={() => setHovered(2)}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                            "relative h-full rounded-lg overflow-hidden transition-all duration-500 ease-out",
                            hovered === 2 ? "scale-[1.03] brightness-110 shadow-xl" : "",
                            hovered !== null && hovered !== 2 ? "blur-sm scale-[0.98]" : ""
                        )}
                    >
                        <Image
                            src={earrings}
                            alt="Aretes dorados sobre fondo claro"
                            fill
                            className="object-cover rounded-lg transition-transform duration-500"
                        />
                        <span className="absolute top-6 left-6 sm:left-10 md:left-8 lg:left-6 text-black text-lg sm:text-xl md:text-2xl font-semibold z-10">
                            <Link
                                href="/products"
                                className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%]"
                            >
                                Aretes.
                            </Link>
                        </span>
                        <span className="font-[var(--font-plus-jakarta)] absolute top-16 left-6 sm:left-10 md:left-16 lg:left-6 text-black text-sm sm:text-base md:text-lg z-10 max-w-[210px]">
                            Luce tu poder con elegancia.
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}
