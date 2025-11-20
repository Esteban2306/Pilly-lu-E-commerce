export default function ProductGallerySkeleton() {
    return (
        <div className=" w-full flex justify-center m-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className=" bg-gray-300 rounded-xl  w-[260px] h-[335px]"
                    ></div>
                ))}
            </div>
        </div>
    )
}