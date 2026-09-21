'use client'

import {
    AnimatePresence,
    motion
} from "framer-motion";
import {
    useState,
    useEffect
} from "react";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";
import { HalfArrowIcon } from "@/shared/ui";

const ReaderVerticalNavigation = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
        className={clsx(
        "fixed inset-0 mx-auto",
        "flex items-end justify-end max-w-[1040px]"
        )}
        style={{
        zIndex: Z_INDEX.readerPageNavigation
        }}
        >
            {/* Кнопка скролла страницы наверх */}
            <AnimatePresence
            initial={false}
            >
                {showButton &&
                <button
                onClick={scrollToTop}
                className={clsx(
                "hover:cursor-pointer",
                "flex justify-center items-end self-stretch right-0",
                "p-[3.3vw] mt-[13.8vw]",
                "bp700px:pl-[90px] bp700px:p-[1.71vw] bp700px:mt-[7.14vw]",
                "bp1200px:pl-[120px] bp1200px:p-[12px] bp1200px:mt-[50px]"
                )}
                >
                    <div
                    onClick={scrollToTop}
                    className={clsx(
                    "increase_hover_anim"
                    )}
                    >
                        <motion.div
                        initial={{ scale: 0, y: -15 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 15 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={clsx(
                        "flex justify-center items-center",
                        "w-fit h-fit",
                        "p-[2.2vw] backdrop-blur-[6px]",
                        "bg-surface_container rounded-[3.3vw]",
                        "bp700px:p-[1.14vw] bp700px:rounded-[1.71vw]",
                        "bp1200px:p-[8px] bp1200px:rounded-[12px]"
                        )}
                        >
                            <HalfArrowIcon
                            svg_className={clsx(
                            "w-[8.8vw] h-[8.8vw] rotate-90",
                            "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                            "bp1200px:w-[32px] bp1200px:h-[32px]"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_subheader"
                            )}
                            />
                        </motion.div>
                    </div>
                </button>}
            </AnimatePresence>
        </div>
    )
}

export { ReaderVerticalNavigation };