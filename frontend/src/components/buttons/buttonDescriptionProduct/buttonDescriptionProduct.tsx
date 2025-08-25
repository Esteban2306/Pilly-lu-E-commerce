'use client'

import { useState } from "react";
import ModalWrapper from "@/components/NavBar/utils/modals/modalWrapper";
import ModalDescription from "@/components/product/utils/modal/modalDescription/modalDescription";

export default function ButtonDescriptionProduct() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="font-semibold relative cursor-pointer after:content-[''] after:block after:border-b-2 after:border-blue-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
                Descripción
            </button>

            <ModalWrapper
                isOpen={isOpen}
                onClose={handleClose}
                className="absolute top-full left-0 mt-2 z-50"
            >
                <ModalDescription />
            </ModalWrapper>
        </div>
    );
}
