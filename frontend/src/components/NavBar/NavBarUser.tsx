"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import logo from "../../../public/images/logo.png";
import { CartIcon } from "../icons/NavBar/navBarIconCart";
import { BellIcon } from "../icons/NavBar/navBarIconBell";
import { SearchIcon } from "../icons/NavBar/navBarIconSearch";
import ModalShop from "./utils/modals/modalShop/modalShop";
import ModalCart from "./utils/modals/modalCart/modalCart";
import SearchBar from "./utils/modals/searchBar/searchBar";
import ModalWrapper from "./utils/modals/modalWrapper";
import ButtonGlowingBorder from "../buttons/buttonGlowingBorder/buttonGlowingBorder";

export default function NavBarUser() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const pathname = usePathname()

    const closeModal = () => setActiveModal(null);

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
                <div className="relative group">
                    <button
                        onClick={() => setActiveModal(prev => prev === 'shop' ? null : 'shop')}
                        className={`${baseClass} ${activeModal === 'shop' ? activeClasses : inactiveClass}`}
                    >
                        Shop
                    </button>
                    <ModalWrapper isOpen={activeModal === 'shop'} onClose={closeModal} >
                        <ModalShop />
                    </ModalWrapper>
                </div>

                <a href="/#ubication" className={`${baseClass} ${pathname === '/#ubication' ? activeClasses : inactiveClass}`}>
                    Contáctanos
                </a>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
                <Link href={'/'}>
                    <Image src={logo} alt="logo de pilly-lu" className="w-28 md:w-40 h-auto object-contain" />
                </Link>
            </div>

            <div className="flex items-center gap-4 md:gap-8 z-10">
                <Link href='/auth/signIn' className="hidden sm:block">
                    <ButtonGlowingBorder text="Iniciar sesion" />
                </Link>
                <div className="relative">
                    <button
                        onClick={() => setActiveModal(prev => prev === 'cart' ? null : 'cart')}
                        className="relative cursor-pointer"
                    >
                        <CartIcon className="size-5 md:size-6" />
                    </button>
                    <ModalWrapper isOpen={activeModal === 'cart'} onClose={closeModal}>
                        <ModalCart />
                    </ModalWrapper>
                </div>

                <button className="cursor-pointer">
                    <BellIcon className="size-5 md:size-6" />
                </button>

                <button
                    onClick={() => setActiveModal(prev => prev === 'search' ? null : 'search')}
                    className="cursor-pointer ">
                    <SearchIcon className="size-5 md:size-6" />
                </button>
                <ModalWrapper isOpen={activeModal === 'search'} onClose={closeModal}>
                    <SearchBar />
                </ModalWrapper>
            </div>
        </header>
    );
}
