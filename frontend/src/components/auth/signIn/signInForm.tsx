'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthApi } from "@/services/AuthApi"
import { useAuth } from "@/context/authContext"
import Image from "next/image"
import iconCandado from '../../../../public/icons/iconCandado.png'
import Link from "next/link"

export const SignInForm = () => {
    const router = useRouter()
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const hadleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        setError(null)
        try {
            await login(email, password)
            router.push('/')
        } catch {
            setError('Error al iniciar sesion, verifica tus credenciales')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="space-y-4" onSubmit={hadleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Ingresa tu email"
                />
            </div>

            <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Ingresa tu contraseña"
                />
            </div>

            <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-gray-600 hover:underline">
                    Olvidaste tu contraseña?
                </a>
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <Image src={iconCandado} alt="icono candado" className="size-4" />
                    inicio seguro
                </span>
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-md bg-secondary py-2 text-white font-medium hover:bg-gray-400 transition"
            >
                {loading ? 'Cargando...' : 'Iniciar Sesion'}
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="flex-1 h-px bg-gray-200"></span>
                o
                <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            <p className="text-center text-sm text-gray-600">
                Eres nuevo en la familia pilly-lu?{" "}
                <Link href={'/auth/signUp'}>Crea una cuenta</Link>
            </p>
        </form>
    )
}