'use client'

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { LogOut, Shield, Settings } from "lucide-react"
import { useAuth } from "@/context/authContext"
import Link from "next/link"
import UserAvatar from "./userAvatar"

const ModalUserPanel = () => {
    const { user, logout } = useAuth()
    if (!user) return null

    const isAdmin = user.role === '68c448d6b93e0784df24f2ce'

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    title="perfil"
                    className="outline-none border-none bg-transparent shadow-none"
                >
                    <UserAvatar name={`${user.firstName} ${user.lastName}`} />
                </button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={10}
                className="
                    w-72 
                    bg-white/90 dark:bg-zinc-800/90 
                    backdrop-blur-sm 
                    shadow-2xl 
                    border border-zinc-200/30 
                    dark:border-zinc-700/50 
                    rounded-xl 
                    p-5 
                    flex flex-col items-center gap-3
                "
            >
                <div className="relative">
                    <div className="size-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-200 p-0.5">
                        <div className="flex items-center justify-center size-full rounded-full bg-white dark:bg-zinc-900">
                            <UserAvatar name={`${user.firstName} ${user.lastName}`} />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
                    <p
                        className={`text-xs mt-1 px-2 py-0.5 rounded-full ${isAdmin
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                    >
                        {isAdmin ? "Administrador" : "Usuario"}
                    </p>
                </div>

                <div className="w-full h-px bg-zinc-200 dark:bg-zinc-700 my-2" />

                <div className="flex flex-col w-full gap-1 text-sm">

                    {isAdmin && (
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                        >
                            <Shield size={16} /> Panel admin
                        </Link>
                    )}

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                    >
                        <LogOut size={16} /> Cerrar sesión
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ModalUserPanel