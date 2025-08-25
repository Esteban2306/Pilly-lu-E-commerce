'use client';

export default function ModalDescription() {
    return (
        <div className='
            animate-fade-in
            animate-duration-200
            bg-primary/30
            bg-gradient-to-r
            from-blue-200/50
            via-transparent
            to-blue-200/50
            backdrop-blur-md
            shadow-lg 
            rounded-lg 
            p-4 
            w-[300px]
            z-50'
        >
            <h3 className="font-bold mb-2">Descripción del Producto</h3>
            <p className="text-sm">
                Esta es la descripción detallada del producto. Aquí puedes incluir todas las
                características, materiales, dimensiones y otros detalles importantes.
            </p>
        </div>
    );
}