import Link from "next/link"
import { Gem } from "lucide-react"
import ringsIcon from '../../../../../../public/icons/iconRingBlack.svg'
import brasaletIcon from '../../../../../../public/icons/iconBrasaletBlack.png'
import cadenaIcon from '../../../../../../public/icons/iconCadenaBlack.png'
import airRingsIcon from '../../../../../../public/icons/iconAirringsBlack.png'
import chairsIcon from '../../../../../../public/icons/iconChairsBlack.png'

export default function ModalShop() {
    const categories = [
        { name: "Todos", href: "/products" },
        { name: "Anillos", href: "/products/anillos", icon: ringsIcon },
        { name: "Manillas", href: "/products/manillas", icon: brasaletIcon },
        { name: "Cadenas", href: "/products/cadenas", icon: cadenaIcon },
        { name: "Aretes", href: "/products/aretes", icon: airRingsIcon },
        { name: "Dijes", href: "/products/dijes", icon: chairsIcon },
    ]

    return (
        <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
                <li key={cat.name}>
                    <Link
                        href={cat.href}
                        className="
              flex items-center gap-2
              px-3 py-2 
              rounded-md 
              font-semibold 
              text-zinc-700 
              dark:text-zinc-200 
              hover:bg-blue-100/60 
              dark:hover:bg-blue-900/40 
              hover:text-blue-600 
              transition
            "
                    >
                        {cat.icon && <img src={cat.icon.src} alt={cat.name} className="size-4 object-contain" />}
                        {cat.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}