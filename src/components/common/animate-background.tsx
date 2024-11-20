"use client";

import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

export function AnimatedBackground({ className }: { className?: string }) {
    return (
        <div className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-white", className)}>
            {/* SVG Dotted Pattern */}
            <motion.svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
                initial={{ opacity: 0.7, translateX: 0, translateY: 0 }}
                animate={{
                    opacity: [0.7, 0.2, 0.7],
                    scale: [1, 1.02, 1],
                    translateX: ["0%", "5%", "0%"],
                    translateY: ["0%", "10%", "0%"],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <defs>
                    <pattern id="dots" patternUnits="userSpaceOnUse" width="50" height="50">
                        <circle cx="25" cy="25" r="2" fill="rgba(173, 216, 230, 0.5)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </motion.svg>

            <motion.div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary to-transparent"
                initial={{ opacity: 0.4, y: 0 }}
                animate={{ opacity: [0.4, 0.6, 0.4], y: [0, 10, 0] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
