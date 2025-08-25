'use client';

import Link from "next/link";

export default function ButtonRedirectProduct() {
    return (
        <Link href={'/products'}>
            <button className="
            font-[var(--font-plus-jakarta)]
            mt-3 
            px-6 
            py-2
            bg-secondary
            text-black  
            text-2xl 
            h-12 
            w-auto 
            rounded-lg 
            hover:bg-blue-400 
            transition 
            cursor-pointer">
                Descubre más
            </button>
        </Link>
    );
}