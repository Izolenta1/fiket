'use client'

import clsx from "clsx";
import { useState } from "react";
import { HalfArrowIcon } from "@/shared/ui";
import {
    AnimatePresence,
    motion
} from "framer-motion";

const ProfileOptions = ({ title, subText, children }: TProfileOptionsProps) => {
    const [isOpened, setOpened] = useState(false);
    
    return (
        <section
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "bp700px:gap-[3.43vw]",
        "bp1200px:gap-[24px]"
        )}
        >
            <div
            className={clsx(
            "transition-color duration-[400ms]",
            "relative",
            "flex flex-col gap-[1.1vw]",
            "p-[3.3vw]",
            "bg-surface_container border-[0.27vw] rounded-[3.3vw] border-border_default overflow-hidden",
            "bp700px:gap-[0.57vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:gap-[4px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]",
            )}
            >
                <h2
                className={clsx(
                "label_l3 text-texticon_base_header select-none"
                )}
                >{title}</h2>

                {subText && 
                <p
                className={clsx(
                "caption_regular text-texticon_base_default select-none"
                )}
                >{subText}</p>}
            </div>

            {children &&             
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[3.43vw]",
            "bp1200px:gap-[24px]"
            )}
            >
                <button
                onClick={() => setOpened(!isOpened)}
                className={clsx(
                "increase_hover_anim hover:cursor-pointer"
                )}
                >
                    <div
                    className={clsx(
                    "flex justify-center items-center gap-[1.1vw]",
                    "px-[4.4vw] py-[2.2vw]",
                    "bg-surface_body border-[0.27vw] border-texticon_base_accent rounded-[3.3vw]",
                    "bp700px:gap-[0.57vw] bp700px:px-[2.29vw] bp700px:py-[1.14vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
                    "bp1200px:gap-[4px] bp1200px:px-[16px] bp1200px:py-[12px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
                    )}
                    >
                        <HalfArrowIcon
                        svg_className={clsx(
                        "transition-all duration-[400ms]",
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]",
                        isOpened ? "rotate-90" : "rotate-270"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_accent"
                        )}
                        />

                        <span
                        className={clsx(
                        "button_regular text-texticon_base_accent select-none"
                        )}
                        >Дополнительные опции</span>
                    </div>
                </button>
    
                {/* Враппер ячеек */}
                <AnimatePresence
                initial={false}
                mode="wait"
                >
                    {isOpened && 
                    <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>}
                </AnimatePresence>
            </div>}

            <div
            className={clsx(
            "h-[0.27vw]",
            "mt-[2.2vw]",
            "bg-border_default rounded-[50%]",
            "bp700px:h-[0.14vw] bp700px:mt-[1.14vw]",
            "bp1200px:h-[1px] bp700px:mt-[8px]"
            )}
            />
        </section>
    );
};

export { ProfileOptions };

type TProfileOptionsProps = {
    title: string,
    subText?: string,
    children?: React.ReactNode
}