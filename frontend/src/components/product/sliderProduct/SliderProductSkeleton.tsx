import ProductGallerySkeleton from "../productGallery/productGallerySkeleton";

export default function SliderProductSkeleton() {
    return (
        <div className="w-full py-10 flex flex-col items-center justify-center animate-pulse">
            <h1 className="text-center text-3xl font-bold mb-10 text-gray-400">
                Productos destacados
            </h1>

            <ProductGallerySkeleton />

            <div className="flex items-center gap-4 mt-6 opacity-40">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
}