import Link from "next/link"
import ringsIcon from '../../../../../../public/icons/iconRingBlack.svg'
import brasaletIcon from '../../../../../../public/icons/iconBrasaletBlack.png'
import cadenaIcon from '../../../../../../public/icons/iconCadenaBlack.png'
import airRingsIcon from '../../../../../../public/icons/iconAirringsBlack.png'
import chairsIcon from '../../../../../../public/icons/iconChairsBlack.png'
import Image from "next/image"

export default function ModalShop() {
    const categories = [
        { name: "Todos", href: "/products" },
        { name: "Anillos", href: "/category/68c841d9aa6f123a0efb5c80", icon: ringsIcon },
        { name: "Manillas", href: "/category/68c841ecaa6f123a0efb5c82", icon: brasaletIcon },
        { name: "Cadenas", href: "/category/68c841fbaa6f123a0efb5c86", icon: cadenaIcon },
        { name: "Aretes", href: "/category/68c841bfaa6f123a0efb5c7e", icon: airRingsIcon },
        { name: "Dijes", href: "/category/68c841f1aa6f123a0efb5c84", icon: chairsIcon },
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
                        {cat.icon && <Image src={cat.icon.src} alt={cat.name} width={16} height={16} className="size-4 object-contain" />}
                        {cat.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}