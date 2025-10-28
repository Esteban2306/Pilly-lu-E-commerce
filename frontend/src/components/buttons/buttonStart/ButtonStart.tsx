import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IGetStartedButtonProps {
    text: string;
    className?: string;
}

export default function GetStartedButton({
    text = "Get started",
    className,
}: IGetStartedButtonProps) {
    return (
        // Contenedor fluido
        <div className="w-full">
            <button
                className={cn(
                    // Base
                    "group flex items-center justify-center gap-3 cursor-pointer rounded-lg font-bold transition-colors duration-100 ease-in-out",
                    "bg-blue-300 hover:bg-blue-300",
                    // Anchos adaptativos
                    "h-10 w-full text-sm sm:h-11 sm:w-auto sm:px-6 sm:text-base md:h-12 md:px-8 lg:h-12 lg:w-auto",
                    className
                )}
            >
                <span
                    className={cn(
                        "text-gray-800 transition-colors duration-100 ease-in-out group-hover:text-white"
                    )}
                >
                    {text}
                </span>

                <div
                    className={cn(
                        // círculo del icono
                        "relative flex items-center justify-center overflow-hidden rounded-full transition-transform duration-100",
                        "bg-blue-200 group-hover:bg-white",
                        "h-6 w-6 sm:h-7 sm:w-7"
                    )}
                >
                    <div className="absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-all duration-200 ease-in-out group-hover:translate-x-0">
                        <ArrowRight
                            size={16}
                            className={cn(
                                "size-6 sm:size-7 transform p-1 text-blue-200 opacity-0 group-hover:opacity-100"
                            )}
                        />
                        <ArrowRight
                            size={16}
                            className={cn(
                                "size-6 sm:size-7 transform p-1 text-amber-100 opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0"
                            )}
                        />
                    </div>
                </div>
            </button>
        </div>
    );
}