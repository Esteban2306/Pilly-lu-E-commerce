'use client';

import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from '../../../public/images/logo.png';
import iconCartStatic from '../../../public/icons/iconCartStatic.png';
import iconSearchStatic from '../../../public/icons/iconSearchStatic.png';
import iconCampaignStatic from '../../../public/icons/iconCampaignStatic.png'


export default function NavBarUser() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-primary h-16 transition-transform duration-300 z-50
                ${show ? 'translate-y-0' : '-translate-y-full'}
            `}
        >
            {/* Menú izquierdo */}
            <nav className="flex items-center gap-6 z-10 ml-7">
                <a href="/" className="text-base font-bold">
                    Shop
                </a>
                <a href="/about" className="text-base font-bold">
                    Acerca de nosotros
                </a>
                <a href="/ubication" className="text-base font-bold">
                    Contáctanos
                </a>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
                <Image
                    src={logo}
                    alt="logo de pilly-lu"
                    className="w-34 h-20 object-contain"
                />
            </div>

            <div className="flex items-center gap-8 z-10 mr-5.5">
                <button className="relative">
                    <Image src={iconCartStatic} alt="Cart icon" className="size-5" />
                </button>

                <button>
                    <Image src={iconCampaignStatic} alt="User icon" className="size-5" />
                </button>

                <button>
                    <Image src={iconSearchStatic} alt="Search icon" className="size-5" />
                </button>
            </div>
        </header>
    );
}