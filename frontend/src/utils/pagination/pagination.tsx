interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
    return (
        <div className="flex justify-center mt-10 gap-4">
            <button
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
                className={`px-4 py-2 border rounded ${page === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
            >
                Anterior
            </button>

            <span className="px-4 py-2">{page} / {totalPages}</span>

            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                className={`px-4 py-2 border rounded ${page === totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
            >
                Siguiente
            </button>
        </div>
    );
}