
import Image from "next/image"
import logo from '../../../../public/images/logo.png'
import Link from "next/link"

export default function SignUp() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4 mt-18">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6">
                <header className="flex flex-col items-center space-y-2">
                    <div className="flex items-center justify-center">
                        <Link href={'/'}>
                            <Image src={logo} alt="Logo" className="w-40 h-18" />
                        </Link>
                    </div>
                </header>

                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold">Crear Cuenta</h2>
                    <p className="text-sm text-gray-500">Únete a nosotros y comienza tu viaje con Pilly-lu.</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="firstName"
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
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Enter a strong password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-md bg-secondary py-2 text-white font-medium hover:bg-gray-400 transition"
                    >
                        Crear Cuenta
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="flex-1 h-px bg-gray-200"></span>
                        or
                        <span className="flex-1 h-px bg-gray-200"></span>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Ya tienes una cuenta?{" "}
                        <a href="/login" className="text-secondary font-medium hover:underline">
                            Inicia Sesión
                        </a>
                    </p>
                </form>
            </div>
        </section>
    )
}
