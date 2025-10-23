"use client"

export default function ButtonCountCart({ value, onChange }: { value: number, onChange: (value: number) => void }) {

    const increment = () => { onChange(value + 1) };
    const decrement = () => { onChange(value > 1 ? value - 1 : 1) };

    return (
        <div className=" items-center mt-4">
            <button onClick={decrement} className="px-2 py-1 border-2 rounded-l cursor-pointer">-</button>
            <input
                type="number"
                value={value}
                min={1}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-8 h-8.5 text-center border-t-2 border-b-2"
            />
            <button onClick={increment} className="px-2 py-1 border-2 rounded-r cursor-pointer">+</button>
        </div>
    )
}
