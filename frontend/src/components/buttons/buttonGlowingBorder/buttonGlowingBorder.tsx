
export default function ButtonGlowingBorder({ text }: { text: string }) {
    return (
        <button
            className="glowing-border hover:bg-secondary px-6 py-2 rounded-md font-semibold text-black cursor-pointer"
        >
            <span className="text-sm">{text}</span>
        </button>
    );
}