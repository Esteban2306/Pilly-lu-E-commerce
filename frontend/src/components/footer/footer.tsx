import Image from 'next/image';
import cartEmail from '../../../public/icons/iconCartEmail.svg';
import celPhone from '../../../public/icons/iconCelphone.svg';
import fly from '../../../public/icons/iconFly.svg';
import logo from '../../../public/images/logo.png'

export default function Footer() {
    return (
        <footer className="bg-blue-100 w-full py-6 px-4 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 justify-between">

                {/* Logo y slogan */}
                <div className="flex flex-col items-center md:items-start ml-8">
                    <Image
                        src={logo}
                        alt='Logo de Pilly Lu'
                        className='max-w-[200px] w-full h-auto mb-2 ml-6'
                    />
                    <p className="font-semibold text-center md:text-left text-[18px]">
                        Cada joya, un instante eterno.
                    </p>
                </div>

                {/* Datos de contacto */}
                <div className="mt-7 flex flex-col gap-3 text-sm text-gray-800 mr-8">
                    <p className="flex items-center gap-2">
                        <Image src={fly} alt="Envío seguro" className='size-6' />
                        <span className='text-[16px]'>Envío seguro a toda Colombia</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Image src={celPhone} alt="Teléfono" className='size-6' />
                        <span className='text-[16px]'>Teléfono: +57 315 4544 4545</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Image src={cartEmail} alt="Correo electrónico" className='size-6' />
                        <span className='text-[16px]'>Email: contactenos@ejemplo.com.co</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
