'use client'

import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from "react";
import { Z_INDEX } from "@/shared/config";
import clsx from "clsx";
import { Button } from "@/shared/ui";

const CookieNotification = () => {
    const [isShowed, setShowed] = useState(false)

    useEffect(() => {
        const accepted = localStorage.getItem('cookiesAccepted')
        if (!accepted) {
            setShowed(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true')
        setShowed(false)
    }

    return (
        <AnimatePresence
        mode="sync"
        initial={false}
        >
            {isShowed &&
            <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={clsx(
            "fixed bottom-0 right-0",
            "w-full flex flex-col items-center gap-[3.3vw]",
            "p-[5.5vw]",
            "bp700px:gap-[1.71vw] bp700px:p-[2.86vw]",
            "bp1200px:gap-[12px] bp1200px:p-[20px]"
            )}
            style={{
                zIndex: Z_INDEX.cookieNotification
            }}
            >
                <div
                className={clsx(
                "bg-surface_secondary rounded-[3.3vw]",
                "p-[3.3vw]",
                "w-[88.8vw] flex flex-col gap-[3.3vw]",
                "bp700px:w-[60vw] bp700px:rounded-[1.71vw] bp700px:p-[1.71vw] bp700px:gap-[1.71vw]",
                "bp1200px:w-[540px] bp1200px:rounded-[12px] bp1200px:p-[12px] bp1200px:gap-[12px]"
                )}
                >
                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_default"
                    )}
                    >На сайте используются <span className="!font-[700]">файлы куки</span>, оставаясь на сайте вы соглашаетесь с <Link href="/politics" className="text-texticon_base_accent underline underline-offset-2 decoration-skip-ink-none">политикой обработки персональных данных</Link> сервиса</span>
                    
                    <Button
                    text="Подтвердить"
                    onClick={handleAccept}
                    />
                </div>
            </motion.div>}
        </AnimatePresence>
    );
}

export { CookieNotification }