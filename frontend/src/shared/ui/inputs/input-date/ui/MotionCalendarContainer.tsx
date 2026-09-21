"use client";

import { motion } from "framer-motion";

export function MotionCalendarContainer({ children, className }: any) {
    return (
        <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={className}
        >
            {children}
        </motion.div>
    );
}