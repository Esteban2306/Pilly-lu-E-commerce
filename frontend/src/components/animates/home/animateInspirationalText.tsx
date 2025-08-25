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
                <span>M</span><span>á</span><span>s</span><span> </span><span>q</span><span>u</span><span>e</span><span> </span>
                <span>a</span><span>d</span><span>o</span><span>r</span><span>n</span><span>o</span><span>s</span><span>,</span><span> </span>
                <span>n</span><span>u</span><span>e</span><span>s</span><span>t</span><span>r</span><span>a</span><span>s</span><span> </span>
                <span>j</span><span>o</span><span>y</span><span>a</span><span>s</span><span> </span>
                <span>s</span><span>o</span><span>n</span><span> </span>
                <span>t</span><span>e</span><span>s</span><span>t</span><span>i</span><span>g</span><span>o</span><span>s</span><span> </span>
                <span>d</span><span>e</span><span> </span>
                <span>t</span><span>u</span><span> </span>
                <span>c</span><span>a</span><span>m</span><span>i</span><span>n</span><span>o</span><span>,</span><span> </span>
                <span>t</span><span>u</span><span>s</span><span> </span>
                <span>e</span><span>m</span><span>o</span><span>c</span><span>i</span><span>o</span><span>n</span><span>e</span><span>s</span><span> </span>
                <span>y</span><span> </span>
                <span>t</span><span>u</span><span> </span>
                <span>a</span><span>u</span><span>t</span><span>e</span><span>n</span><span>t</span><span>i</span><span>c</span><span>i</span><span>d</span><span>a</span><span>d</span><span>.</span>
            </p>
        </div>
    )
}