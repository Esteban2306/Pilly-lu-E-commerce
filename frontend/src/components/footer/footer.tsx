'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import { useWeatherApi } from '@/hooks/weatherApi/weatherApi'
import getWeatherIcon from '@/utils/getWeaterIcon/getWeaterIcon'

export default function Footer() {
    const { Weather, error, loading } = useWeatherApi()

    return (
        <footer className="background-footer text-gray-900 px-6 sm:px-10 md:px-16 py-10 sm:py-12 lg:py-16 mask-t-at-center mask-t-from-90% mask-t-to-99%">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

                <div className="text-center sm:text-left">
                    <Link href={'/'}>
                        <Image src={logo} alt='logo de pilly-lu' className='w-32 h-auto mx-auto sm:mx-0 cursor-pointer' />
                    </Link>
                    <p className="text-sm leading-relaxed mt-4">
                        Joyas atemporales elaboradas con precisión y elegancia. Descubre piezas que realzan cada momento.
                    </p>
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-sm font-semibold mb-4">Weather</h3>

                    {loading && <p className="text-xs mt-2 text-gray-400">Cargando clima...</p>}
                    {error && <p className="text-xs mt-2 text-red-400">{error}</p>}
                    {Weather && (
                        <div className="backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-gray-900 gap-2">
                            <Image
                                src={getWeatherIcon(Weather.weatherCode)}
                                alt="Weather Icon"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            <p className="text-sm text-center">
                                🌡 {Weather.temperature}°C | 💨 {Weather.windSpeed} km/h
                            </p>
                        </div>
                    )}
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-sm font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/products" className="hover:underline">Productos</Link></li>
                        <li><Link href="/services" className="hover:underline">Productos Populares</Link></li>
                        <li><Link href="/#ubication" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-sm font-semibold mb-4">Newsletter</h3>
                    <form className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-3 py-2 backdrop-blur-lg text-sm rounded-md focus:outline-none focus:ring focus:ring-blue-300 flex-1 min-w-[200px]"
                        />
                        <button
                            type="submit"
                            className="backdrop-blur-3xl hover:bg-blue-200 transition-colors duration-300 px-4 py-2 rounded-md text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex justify-center md:justify-start space-x-4 text-gray-800 text-lg">
                    <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                    <Link href="#"><i className="fab fa-instagram"></i></Link>
                    <Link href="#"><i className="fab fa-twitter"></i></Link>
                </div>

                <div className="text-sm text-center md:text-right text-gray-800 space-y-2 md:space-y-0 md:space-x-6">
                    <span className="block md:inline">support@pilly-lujewels.com</span>
                    <span className="block md:inline">+1 (212) 555-0199</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-6 text-center text-xs text-gray-700">
                © 2025 Pilly-lu. All rights reserved.
            </div>
        </footer>
    )
}
