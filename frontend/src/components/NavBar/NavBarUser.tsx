"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "../../../public/images/logo.png"
import { CartIcon } from "../icons/NavBar/navBarIconCart"
import { BellIcon } from "../icons/NavBar/navBarIconBell"
import { SearchIcon } from "../icons/NavBar/navBarIconSearch"
import ModalCart from "./utils/modals/modalCart/modalCart"
import SearchBar from "./utils/modals/searchBar/searchBar"
import ButtonGlowingBorder from "../buttons/buttonGlowingBorder/buttonGlowingBorder"
import { useAuth } from "@/context/authContext"
import ModalUserPanel from "@/utils/modals/modalUser/ModalUserPanel"
import ShopPopover from "./utils/modals/modalShop/ShopPopover"

import {
    DropDrawer,
    DropDrawerTrigger,
    DropDrawerContent,
    DropDrawerGroup,
    DropDrawerItem,
    DropDrawerSub,
    DropDrawerSubTrigger,
    DropDrawerSubContent,
} from "@/components/ui/dropdrawer"

import ringsIcon from '../../../public/icons/iconRingBlack.svg'
import brasaletIcon from '../../../public/icons/iconBrasaletBlack.png'
import cadenaIcon from '../../../public/icons/iconCadenaBlack.png'
import airRingsIcon from '../../../public/icons/iconAirringsBlack.png'
import chairsIcon from '../../../public/icons/iconChairsBlack.png'
import iconUser from '../../../public/icons/iconUser.png'
import ModalNotification from "./utils/modals/modalNotification/modalNotification"

export default function NavBarUser() {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const pathname = usePathname()
    const { token } = useAuth()

    const categories = [
        { name: "Todos", href: "/products" },
        { name: "Anillos", href: "/products/anillos", icon: ringsIcon },
        { name: "Manillas", href: "/products/manillas", icon: brasaletIcon },
        { name: "Cadenas", href: "/products/cadenas", icon: cadenaIcon },
        { name: "Aretes", href: "/products/aretes", icon: airRingsIcon },
        { name: "Dijes", href: "/products/dijes", icon: chairsIcon },
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) setShow(false)
            else setShow(true)
            setLastScrollY(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const baseClass = "text-base font-bold cursor-pointer"
    const inactiveClass =
        'text-gray-700 border-transparent hover:text-gray-900 hover:animate-scale hover:animate-duration-100 after:content-[""] after:block after:border-b-2 after:border-blue-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
    const activeClasses = "text-gray-900 border-b-blue-300 border-b-2 "

    return (
        <header
            className={`fixed top-1 left-1/2 -translate-x-1/2 w-[96%]
        rounded-sm flex items-center justify-between
        bg-primary/30 bg-gradient-to-r from-blue-200/50 via-transparent to-blue-200/50
        backdrop-blur-md h-20 px-4 md:px-10 transition-transform duration-300 z-50
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
        >

            <nav className="hidden md:flex items-center gap-6 z-10">
                <ShopPopover />
                <Link
                    href="/#ubication"
                    className={`${baseClass} ${pathname === "/#ubication" ? activeClasses : inactiveClass}`}
                >
                    Contáctanos
                </Link>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
                <Link href={"/"}>
                    <Image src={logo} alt="logo de pilly-lu" className="w-28 md:w-40 h-auto object-contain" />
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-3 md:gap-5 z-10">
                <ModalCart
                    trigger={
                        <button
                            className="relative cursor-pointer p-2 rounded-lg border border-blue-200
              bg-blue-100/50 text-black hover:bg-blue-200/70
              transition duration-200 flex items-center justify-center"
                        >
                            <CartIcon className="size-4 md:size-5" />
                        </button>
                    }
                />


                <ModalNotification />


                <button
                    onClick={() => setActiveModal(prev => (prev === "search" ? null : "search"))}
                    className="cursor-pointer p-2 rounded-lg border border-blue-200
          bg-blue-100/50 text-black hover:bg-blue-200/70
          transition duration-200 flex items-center justify-center"
                >
                    <SearchIcon className="size-4 md:size-5" />
                </button>

                {activeModal === "search" && (
                    <div className="absolute top-full right-0 mt-2">
                        <SearchBar />
                    </div>
                )}

                {token ? (
                    <ModalUserPanel />
                ) : (
                    <Link href="/auth/signIn" className="hidden sm:block">
                        <ButtonGlowingBorder text="Iniciar sesión" />
                    </Link>
                )}
            </div>

            <div className="flex md:hidden items-center gap-3 z-20">
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
                        className="
                            fixed inset-x-0 bottom-0 w-full h-[90vh]
                            bg-white dark:bg-zinc-800
                            border-t border-zinc-300
                            rounded-t-2xl shadow-2xl overflow-y-auto
                            flex flex-col
                            "
                    >
                        <DropDrawerGroup className="bg-gray-100 space-y-2 gap-4 text-lg font-semibold justify-center mt-[40px] ">
                            <DropDrawerItem className="h-14">
                                <Link
                                    href="/"
                                    className="block w-full text-center py-2 rounded-md  transition"
                                >
                                    Inicio
                                </Link>
                            </DropDrawerItem>

                            <DropDrawerSub id="Shop"  >
                                <DropDrawerSubTrigger
                                    title="Shop"
                                    className="w-full flex h-14 justify-between items-center py-2 px-4 rounded-md b transition"
                                >
                                    <span>Shop</span>
                                </DropDrawerSubTrigger>

                                <DropDrawerSubContent
                                    id="Shop"
                                    title="Shop"
                                    className="
                                        border-t border-zinc-300 pt-3 mt-1
                                        flex flex-col gap-2 animate-in fade-in-50   
                                    "
                                >

                                    <div className="flex flex-col items-center space-y-3">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={cat.href}
                                                className="
                                                    flex items-center justify-center 
                                                    gap-2
                                                    w-full max-w-[90vw]
                                                    px-4 py-2 rounded-md
                                                    bg-gray-200
                                                    text-zinc-700 hover:text-blue-600 hover:bg-white
                                                    transition
                                                "
                                            >
                                                {cat.icon && <Image src={cat.icon.src} alt={cat.name} width={16} height={16} className="size-4 object-contain" />}
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </DropDrawerSubContent>
                            </DropDrawerSub>

                            <DropDrawerItem className="h-14">
                                <Link
                                    href="/#ubication"
                                    className="block w-full text-center py-2 rounded-md transition"
                                >
                                    Contáctanos
                                </Link>
                            </DropDrawerItem>
                        </DropDrawerGroup>

                        <div className="border-t border-zinc-300 pt-4 space-y-2 max-w-[90vw] m-auto">
                            <ModalCart
                                trigger={
                                    <button className="max-w-[380px] w-full flex items-center gap-2 px-6 py-4 font-black rounded-md bg-gray-100 hover:bg-white transition text-zinc-900">
                                        Carrito <CartIcon className="size-5" />
                                    </button>
                                }
                            />
                            <DropDrawerSub>
                                <DropDrawerSubTrigger className="max-w-[380px] w-full flex items-center gap-2 px-6 py-4 font-black rounded-md bg-gray-100 hover:bg-white transition text-zinc-900 m-0">
                                    <span className='font-bold'>Notificación</span>
                                    <BellIcon />
                                </DropDrawerSubTrigger>
                                <DropDrawerSubContent
                                    id="notifications"
                                    title="Notificaciones"
                                    className="border-t border-zinc-300 pt-3 mt-1 flex flex-col gap-2 animate-in fade-in-50"
                                >
                                    <ModalNotification inline />
                                </DropDrawerSubContent>
                            </DropDrawerSub>

                            <DropDrawerSub>
                                <button
                                    onClick={() => setActiveModal(prev => (prev === "search" ? null : "search"))}
                                    className="max-w-[380px] w-full flex items-center gap-2 px-6 py-4 font-black rounded-md bg-gray-100 hover:bg-white transition text-zinc-900"
                                >
                                    Buscar <SearchIcon className="size-5" />
                                </button>
                            </DropDrawerSub>
                        </div>
                    </DropDrawerContent>
                </DropDrawer>

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
        </header>
    )
}