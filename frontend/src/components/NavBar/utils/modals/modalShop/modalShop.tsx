

import Link from "next/link";

export default function ModalShop() {
    return (
        <div className=' absolute top-[19px] -left-5  
                animate-fade-in
                animate-duration-200
                 bg-primary/30
                bg-gradient-to-r
                from-blue-200/50
                via-transparent
                to-blue-200/50
                backdrop-blur-md
                shadow-lg rounded-b-lg p-4 w-30 h-auto z-50'>
            <ul>
                <li className='font-bold mb-1'>
                    <button className="cursor-pointer">
                        <Link href={'/products'}>
                            Todos
                        </Link>
                    </button>
                </li>
                <li className='font-bold mb-1'>
                    <button className="cursor-pointer">Anillos</button>
                </li>
                <li className='font-bold mb-1'>
                    <button className="cursor-pointer">Manillas</button>
                </li>
                <li className='font-bold mb-1'>
                    <button className="cursor-pointer">Cadenas</button>
                </li>
                <li className='font-bold mb-1 '>
                    <button className="cursor-pointer">Aretes</button>
                </li>
                <li className='font-bold'>
                    <button className="cursor-pointer">Dijes</button>
                </li>
            </ul>
        </div>
    );
}
