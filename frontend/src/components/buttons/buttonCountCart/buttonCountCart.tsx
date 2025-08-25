"use client"

import { useState } from 'react'

export default function ButtonCountCart() {
    const [count, setCount] = useState(1);

    const increment = () => { setCount(val => val + 1) };
    const decrement = () => { setCount(val => val > 1 ? val - 1 : 1) };

    return (
        <div className=" items-center mt-4">
            <button onClick={decrement} className="px-2 py-1 border-2 rounded-l cursor-pointer">-</button>
            <input
                type="number"
                value={count}
                min={1}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-8 h-8.5 text-center border-t-2 border-b-2"
            />
            <button onClick={increment} className="px-2 py-1 border-2 rounded-r cursor-pointer">+</button>
        </div>
    )
}
