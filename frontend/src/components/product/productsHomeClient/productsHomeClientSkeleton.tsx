export default function ProductsHomeClientSkeleton() {
    return (
        <>
            {Array.from({ length: 12 }).map((_, index) => (
                <div
                    key={index}
                    className="w-[280px] h-[335px] rounded-xl bg-gray-300 animate-pulse"
                />
            ))}
        </>
    );
}