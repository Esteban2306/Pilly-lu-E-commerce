
import Image from "next/image"
import logo from '../../../../public/images/logo.png'
import Link from "next/link"
import SignUpForm from "@/components/auth/signUp/signUpForm"

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

                <SignUpForm />
            </div>
        </section>
    )
}
