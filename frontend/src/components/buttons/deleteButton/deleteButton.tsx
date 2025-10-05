"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Delete = () => {
    const [isActive, setIsActive] = useState(true);

    const handleDeleteClick = () => setIsActive(false);
    const handleCancelClick = () => setIsActive(true);

    return (
        <div className="relative flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div
                className="relative flex items-center justify-center"
                style={{ filter: "url(#goo)" }}
            >
                <motion.button
                    whileHover={{ scale: 0.9 }}
                    className={cn(
                        "h-10 rounded-md px-10 transition-all z-10 bg-gray-200 text-black duration-500 flex items-center justify-center"
                    )}
                    onClick={handleDeleteClick}
                >
                    Delete
                </motion.button>

                <AnimatePresence>
                    {!isActive && (
                        <motion.button
                            whileHover={{ scale: 0.9 }}
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: -100 }}
                            exit={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute h-10 w-10 rounded-full bg-red-400 text-black flex items-center justify-center"
                            onClick={() => console.log("✅ Eliminado")}
                        >
                            <Check className="w-4 h-4" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isActive && (
                        <motion.button
                            whileHover={{ scale: 0.9 }}
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 100 }}
                            exit={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute h-10 w-10 rounded-full bg-green-400 text-black flex items-center justify-center"
                            onClick={handleCancelClick}
                        >
                            <X className="w-4 h-4" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Delete;
