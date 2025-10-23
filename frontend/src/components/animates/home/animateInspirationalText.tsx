'use client'

import { TextGenerateEffect } from "@/components/ui/text-generate-effect"


export default function animateInspirationalText() {
    const word = 'Más que adornos, nuestras joyas son testigos de tu camino, tus emociones y tu autenticidad.'
    return (
        <div className="max-w-3xl mx-auto ">
            <TextGenerateEffect words={word} className="text-center text-9xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold" filter duration={0.8} />
        </div>
    )
}