import React from "react";
import { useAuth } from "@/context/authContext";


const ModalUser = () => {

    const { user, logout } = useAuth()

    if (!user) return null;

    return (
        <div className="
                animate-fade-in
                animate-duration-200
                fixed 
                right-22 
                top-20 
                h-30 
                w-65 
                 bg-primary/80
                bg-gradient-to-r
                from-blue-200/50
                via-transparent
                to-blue-200/50
                backdrop-blur-md
                shadow-lg 
                rounded-b-lg 
                p-4 
                flex 
                flex-col
        ">
            <div className="flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center mb-2.5">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
            </div>

            <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={logout}
            >
                Cerrar Sesión
            </button>

        </div>
    );
};

export default ModalUser;
