'use client'

import { createScope, utils, animate } from "animejs"
import { useRef, useEffect } from "react"


export default function animateInspirationalText() {
    const root = useRef(null)
    const scope = useRef<ReturnType<typeof createScope>>(null)
    const text = '"Más que adornos, nuestras joyas son testigos de tu camino, tus emociones y tu autenticidad."'
    useEffect(() => {
        scope.current = createScope({ root }).add(() => {
            const $span = utils.$('.parrafo')
            animate($span, {
                y: [
                    { to: '-2rem', ease: 'outExpo', duration: 600 },
                    { to: 0, ease: 'outBounce', duration: 800, delay: 400 }
                ],
                loop: true,
                loopDelay: 400,
            })
        })
    }, [])

    return (
        <div ref={root} className="max-w-3xl mx-auto ">
            <p className="parrafo text-4xl md:text-4xl italic font-semibold">
                "Más que adornos, nuestras joyas son testigos de tu camino, tus emociones y tu autenticidad."
            </p>
        </div>
    )
}