"use client"

import { useState } from "react"
import { DropDrawer, DropDrawerContent, DropDrawerTrigger } from "@/components/ui/dropdrawer"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import ModalShop from "./modalShop"
import { useIsMobile } from "@/hooks/use-mobile"


export default function ShopPopover() {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    const baseClass = "text-base font-bold cursor-pointer transition-all duration-200"
    const inactiveClass =
        'text-gray-700 border-transparent hover:text-gray-900 hover:animate-scale hover:animate-duration-100 after:content-[""] after:block after:border-b-2 after:border-blue-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
    const activeClasses = "text-gray-900 border-b-blue-300 border-b-2"

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className={`${baseClass} ${open ? activeClasses : inactiveClass}`}
                    aria-expanded={open}                 >
                    Shop
                </button>
            </PopoverTrigger>

            <PopoverContent
                sideOffset={10}
                align="start"
                className="
           w-48
           bg-white/90 dark:bg-zinc-900/90
           backdrop-blur-md
           border border-zinc-200/30 dark:border-zinc-700/50
           shadow-2xl
           rounded-xl
           p-3
           animate-in fade-in-50 zoom-in-95
         "
            >
                <ModalShop />
            </PopoverContent>
        </Popover>
    )
}

// <DropDrawer>
//     <DropDrawerTrigger asChild>
//         <button
//             className={`${baseClass} ${open ? activeClasses : inactiveClass}`}
//             aria-expanded={open}
//         >
//             Shop
//         </button>
//     </DropDrawerTrigger>

//     <DropDrawerContent
//         // Aplica sideOffset solo si NO es mobile
//         {...(!isMobile && { sideOffset: 10, align: "start" })}
//         className={`
//   bg-white/90 dark:bg-zinc-900/90
//   backdrop-blur-md
//   border border-zinc-200/30 dark:border-zinc-700/50
//   shadow-2xl
//   rounded-xl
//   p-3
//   animate-in fade-in-50 zoom-in-95
//   ${isMobile
//                 ? "fixed inset-x-0 bottom-0 w-full h-[90vh] rounded-none p-6 overflow-y-auto"
//                 : "w-48"
//             }
// `}
//     >
//         <ModalShop />
//     </DropDrawerContent>
// </DropDrawer>