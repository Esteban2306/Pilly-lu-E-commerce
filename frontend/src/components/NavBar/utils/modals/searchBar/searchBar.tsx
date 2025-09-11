

export default function searchBar() {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Buscar productos..."
                className="animate-slide-in-right w-2xs h-8 absolute left-230 -top-17 bg-[#F4F4F4] p-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="animate-slide-in-right absolute left-296 bottom-8 transform -translate-y-1/2 text-gray-500 hover:text-blue-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2.5-4.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                    />
                </svg>
            </button>
        </div>
    );
}