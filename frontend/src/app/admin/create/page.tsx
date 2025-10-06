import CreateProduct from '@/components/adminPage/createProduct/createProduct';

export default function adminPage() {
    return (
        <main className="p-8 mt-16 bg-gray-50 min-h-screen">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Crear Producto</h1>
            </header>

            <CreateProduct />
        </main>
    );
}