"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import logo from '../../../../public/images/logo.png'
import ButtonGlowingBorder from "@/components/buttons/buttonGlowingBorder/buttonGlowingBorder";
import { useAuth } from "@/context/authContext";
import ModalUserPanel from "@/utils/modals/modalUser/ModalUserPanel";
import iconUser from '../../../../public/icons/iconUser.png'
import {
    DropDrawer,
    DropDrawerTrigger,
    DropDrawerContent,
    DropDrawerGroup,
    DropDrawerItem,
} from "@/components/ui/dropdrawer"

export function NavBarAdmin() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    // const [activeModal, setActiveModal] = useState<string | null>(null);

    const pathname = usePathname()

    const { token } = useAuth()

    // const closeModal = () => setActiveModal(null);

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

    const baseClass = 'text-base font-bold cursor-pointer';
    const inactiveClass = 'text-gray-700 border-transparent hover:text-gray-900 hover:animate-scale hover:animate-duration-100 after:content-[""] after:block after:border-b-2 after:border-blue-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
    const activeClasses = "text-gray-900 border-b-blue-300 border-b-2 ";

    return (
        <header
            className={`
                fixed 
                top-1
                left-1/2
                -translate-x-1/2
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
                px-4
                md:px-10
                transition-transform 
                duration-300 
                z-50
                ${show ? "translate-y-0" : "-translate-y-full"}
            `}
        >
            <nav className="hidden md:flex items-center gap-6 z-10">
                <Link href="/admin/users">
                    <div className={`${baseClass} ${pathname === '/#ubication' ? activeClasses : inactiveClass}`}>
                        Usuarios
                    </div>
                </Link>

                <Link href="/admin/orders">
                    <div className={`${baseClass} ${pathname === '/#ubication' ? activeClasses : inactiveClass}`}>
                        Ordenes
                    </div>
                </Link>

                <Link href="/admin/dashboard">
                    <div className={`${baseClass} ${pathname === '/#ubication' ? activeClasses : inactiveClass}`}>
                        Productos
                    </div>
                </Link>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
                <Link href={'/'}>
                    <Image src={logo} alt="logo de pilly-lu" className="w-28 md:w-40 h-auto object-contain" />
                </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-4 z-10">
                {token ? (
                    <ModalUserPanel />
                ) : (
                    <Link href="/auth/signIn">
                        <ButtonGlowingBorder text="Iniciar sesión" />
                    </Link>
                )}
            </div>

            <div className="flex md:hidden items-center justify-between w-full z-20">
                <div>
                    {token ? (
                        <ModalUserPanel />
                    ) : (
                        <Link
                            href="/auth/signIn"
                            className="p-2 rounded-full border border-blue-300 bg-blue-100/40 text-black hover:bg-blue-200/70 transition flex items-center justify-center w-10 h-10"
                        >
                            <Image src={iconUser} alt="icono de usuario no logueado" />
                        </Link>
                    )}
                </div>
                <div>
                    <DropDrawer>
                        <DropDrawerTrigger asChild>
                            <button
                                className="p-2 rounded-lg border border-blue-300 bg-blue-100/40 text-black hover:bg-blue-200/70 transition"
                                aria-label="Abrir menú"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </DropDrawerTrigger>

                        <DropDrawerContent
                            className="fixed inset-x-0 bottom-0 w-full max-h-[70vh]
        bg-white dark:bg-zinc-800 border-t border-zinc-300
        rounded-t-2xl shadow-2xl overflow-y-auto flex flex-col"
                        >
                            <DropDrawerGroup>
                                <DropDrawerItem>
                                    <Link href="/admin/users" className="font-bold">Usuarios</Link>
                                </DropDrawerItem>
                                <DropDrawerItem>
                                    <Link href="/admin/orders" className="font-bold">Órdenes</Link>
                                </DropDrawerItem>
                                <DropDrawerItem>
                                    <Link href="/admin/dashboard" className="font-bold">Productos</Link>
                                </DropDrawerItem>
                            </DropDrawerGroup>
                        </DropDrawerContent>
                    </DropDrawer>
                </div>
            </div>
        </header>
    );
}