"use client";

import { useRef, useEffect, useState } from "react";
import { ModalWrapperProps } from "./modalWrapper.type";
import modalContext from "@/context/modalContext";

export default function ModalWrapper({
    isOpen,
    onClose,
    children,
    triggerRefs = [],
    className = "absolute top-full left-0 mt-2 z-50"
}: ModalWrapperProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleDocClick = (e: MouseEvent) => {
            const target = e.target as Node;
            const clickedInside = !!wrapperRef.current?.contains(target);
            const clickedOnTrigger = triggerRefs.some(ref => ref.current?.contains(target));

            if (!clickedInside && !clickedOnTrigger) onClose();
        };
        document.addEventListener("click", handleDocClick);
        return () => document.removeEventListener("click", handleDocClick);
    }, [isOpen, onClose, triggerRefs]);

    if (!isOpen) return null;
    const stop = (e: React.MouseEvent) => e.stopPropagation();



    return (

        <div ref={wrapperRef} onClick={stop} className={className}>
            {children}
        </div>
    );
}
