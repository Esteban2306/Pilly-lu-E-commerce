import Image from "next/image"
import logo from '../../../../public/images/logo.png'
import Link from "next/link"
import iconCandado from '../../../../public/icons/iconCandado.png'

export default function SignIn() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4 mt-14">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6">
                <header className="flex flex-col items-center space-y-2">
                    <div className="flex items-center justify-center">
                        <Link href={'/'}>
                            <Image src={logo} alt="Logo" className="w-40 h-18" />
                        </Link>

                    </div>
                </header>

                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold">Inciar Sesion</h2>
                    <p className="text-sm text-gray-500">
                        Bienvenido de nuevo. Introduce tus datos.
                    </p>
                </div>

                <form className="space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
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
                        Iniciar Sesion
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="flex-1 h-px bg-gray-200"></span>
                        o
                        <span className="flex-1 h-px bg-gray-200"></span>
                    </div>

                    {/* Crear cuenta */}
                    <p className="text-center text-sm text-gray-600">
                        Eres nuevo en la familia pilly-lu?{" "}
                        <a href="#" className="text-secondary font-medium hover:underline">
                            Crea una cuenta
                        </a>
                    </p>
                </form>
            </div>
        </section>
    )
}