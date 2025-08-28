"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import logo from "../../../../public/images/logo.png";

export default function NavBarAuth() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const pathname = usePathname()

    const isSignInPage = pathname === '/auth/signIn';
    const isSignUpPage = pathname === '/auth/signUp';


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);
    return (
        <header
            className={`
                fixed 
                top-1
                left-7
                w-[96%]
                rounded-sm
                flex 
                items-center 
                justify-between 
                bg-primary/30
                bg-gradient-to-r
                from-blue-200/50
                via-transparent
                to-blue-200/50
                backdrop-blur-md
                h-20
                transition-transform 
                duration-300 
                z-50
                ${show ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <nav className="flex items-center gap-6 z-10 ml-7 relative ">
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
                <Link href={'/'}>
                    <Image src={logo} alt="logo de pilly-lu" className="w-40 h-26 object-contain" />
                </Link>

            </div>

            <div className="flex items-center gap-8 z-10 mr-5.5 relative">

                {isSignInPage && (
                    <button className="bg-secondary text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">
                        <Link href={'/auth/signUp'}>
                            Registrarse
                        </Link>
                    </button>
                )}

                {isSignUpPage && (
                    <button className="bg-secondary text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">
                        <Link href={'/auth/signIn'}>
                            Iniciar Sesión
                        </Link>
                    </button>
                )}

            </div>
        </header >
    );
}
