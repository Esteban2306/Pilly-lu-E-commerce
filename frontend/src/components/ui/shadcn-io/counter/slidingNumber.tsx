"use client"

import * as React from "react"
import { motion } from "framer-motion"

export interface SlidingNumberProps extends React.ComponentPropsWithoutRef<typeof motion.span> {
    number: number
}

export function SlidingNumber({ number, className, ...props }: SlidingNumberProps) {
    return (
        <motion.span
            key={number}
            className={className}   // ahora sí puedes pasarle estilos
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            {...props}              // se pasan atributos extra como onClick, id, etc.
        >
            {number}
        </motion.span>
    )
}