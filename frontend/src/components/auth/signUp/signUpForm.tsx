'use client'


import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authContext"
import { authApi, AuthApi } from "@/services/AuthApi"


const SignUpForm = () => {

    const router = useRouter()
    const { user } = useAuth()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        try {
            await authApi.signUp({ firstName, lastName, email, password })
            router.push('/auth/signIn')
        } catch {
            setError('Error al crear la cuenta, intenta nuevamente')
        } finally {
            setLoading(false)
        }
    }

    console.log(handleSubmit)

    return (
        <form className="space-y-4" >
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="John"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Doe"
                    />
                </div>
            </div>

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
                    placeholder="johndoe@email.com"
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
                    placeholder="Enter a strong password"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-secondary py-2 text-white font-medium hover:bg-gray-400 transition"
            >
                {loading ? 'Cargando...' : 'Crear Cuenta'}
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="flex-1 h-px bg-gray-200"></span>
                or
                <span className="flex-1 h-px bg-gray-200"></span>
            </div>

            <p className="text-center text-sm text-gray-600">
                Ya tienes una cuenta?{" "}
                <Link href={'/auth/signIn'}>Iniciar Sesion</Link>
            </p>
        </form>
    )
}

export default SignUpForm