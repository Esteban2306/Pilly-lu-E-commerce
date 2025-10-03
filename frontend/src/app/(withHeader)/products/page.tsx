import Image from 'next/image';
import Link from 'next/link';
import aretes from '../../../../public/icons/iconAirrings.svg';
import manilla from '../../../../public/icons/iconBracelet.svg';
import cadenas from '../../../../public/icons/iconChains.svg';
import dijes from '../../../../public/icons/iconCharms.svg';
import anillos from '../../../../public/icons/iconRing.svg';
import ProductGallery from '@/components/product/productGallery/productGallery';
import { productApi } from '@/services/ProductApi';
import { Product } from '@/types/productsCategory.types';

export default async function productsPage() {

    type CategoriasType = {
        nombre: string;
        icono: string;
        slug: string;
    };

    const categorias = [
        { nombre: "Anillos", icono: anillos, slug: "anillos", categoryId: '68c841d9aa6f123a0efb5c80' },
        { nombre: "Aretes", icono: aretes, slug: "aretes", categoryId: '68c841bfaa6f123a0efb5c7e' },
        { nombre: "Manilla", icono: manilla, slug: "manillas", categoryId: '68c841ecaa6f123a0efb5c82' },
        { nombre: "Dijes", icono: dijes, slug: "dijes", categoryId: '68c841f1aa6f123a0efb5c84' },
        { nombre: "Cadenas", icono: cadenas, slug: "cadenas", categoryId: '68c841fbaa6f123a0efb5c86' },
    ];

    const product = await productApi.getAll<Product[]>()

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
                        href={`/product/category/${cat.slug}`}
                        key={i}
                        className="flex flex-col items-center"
                    >
                        <div className="w-28 h-28 bg-blue-300 shadow-xl/30 rounded-full flex items-center justify-center">
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
                    gap-7 
                    mt-20 mb-18
                    [grid-template-columns:repeat(1,280px)]
                    sm:[grid-template-columns:repeat(2,280px)]
                    lg:[grid-template-columns:repeat(3,280px)]
                ">
                {product.map((p) => (
                    <ProductGallery
                        key={p._id}
                        _id={p._id}
                        productName={p.productName}
                        price={p.price}
                        images={p.images}
                    />
                ))}


            </div>
        </main>

    );
}