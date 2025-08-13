"use client";

import Image from 'next/image';
import Link from 'next/link';
import aretes from '../../../public/icons/iconAirrings.svg';
import manilla from '../../../public/icons/iconBracelet.svg';
import cadenas from '../../../public/icons/iconChains.svg';
import dijes from '../../../public/icons/iconCharms.svg';
import anillos from '../../../public/icons/iconRing.svg';
import ProductGallery from '@/components/product/productGallery/productGallery';

export default function productsPage() {

    type CategoriasType = {
        nombre: string;
        icono: string;
    };

    const categorias: CategoriasType[] = [
        { nombre: "Anillos", icono: anillos },
        { nombre: "Aretes", icono: aretes },
        { nombre: "Manilla", icono: manilla },
        { nombre: "Dijes", icono: dijes },
        { nombre: "Cadenas", icono: cadenas },
    ];



    return (
        <main className='min-h-screen'>
            <div className="flex justify-center mt-28">
                <h1 className="text-4xl font-medium mb-4 h-c">Categorias</h1>
            </div>
            <div className="
                grid 
                justify-items-center 
                justify-center 
                lg:[grid-template-columns:repeat(5,160px)]
                sm:[grid-template-columns:repeat(3,160px)]
                "
            >
                {categorias.map((cat, i) => (
                    <Link
                        href={`/categoria/${cat.nombre.toLowerCase()}`}
                        key={i}
                        className="flex flex-col items-center"
                    >
                        <div className="w-28 h-28 bg-blue-300 border border-black rounded-full flex items-center justify-center">
                            <Image
                                src={cat.icono}
                                alt={cat.nombre}
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <p className="mt-2 text-lg font-medium">{cat.nombre}</p>
                    </Link>
                ))}
            </div>
            <div className="
                    grid 
                    justify-center 
                    gap-4 
                    mt-20 mb-18
                    [grid-template-columns:repeat(1,280px)]
                    sm:[grid-template-columns:repeat(2,280px)]
                    lg:[grid-template-columns:repeat(3,280px)]
                ">
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
                <ProductGallery />
            </div>
        </main>

    );
}