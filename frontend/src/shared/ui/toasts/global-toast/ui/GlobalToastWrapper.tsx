'use client'

import { Z_INDEX } from "@/shared/config";
import clsx from "clsx";
import { useGlobalToast } from "@/global/providers";
import { GlobalToast } from "./GlobalToast";
import { AnimatePresence } from 'framer-motion'

const GlobalToastWrapper = () => {
    const { toasts } = useGlobalToast()
    
    return (
        <div
        className={clsx(
        "fixed bottom-[5.5vw] right-[5.5vw] flex",
        "flex flex-col items-center gap-[3.3vw]",
        "bp700px:gap-[1.71vw] bp700px:bottom-[2.86vw] bp700px:right-0 bp700px:left-0 bp700px:mx-auto",
        "bp1200px:gap-[12px] bp1200px:bottom-[20px] bp1200px:right-[80px] bp1200px:left-auto"
        )}
        style={{
            zIndex: Z_INDEX.globalToast
        }}
        >
            <AnimatePresence
            mode="sync"
            >
                {toasts.map(toast =>
                <GlobalToast
                key={toast.id}
                toast={toast}
                />
                )}
            </AnimatePresence>
        </div>
    );
};

export { GlobalToastWrapper };