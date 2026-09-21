'use client'

import { useState } from "react";
import clsx from "clsx";
import { HalfArrowIcon } from "./icons";
import {
    AnimatePresence,
    motion
} from "framer-motion";

const Accordion = ({ title, children }: TAccordionProps) => {
    const [isOpened, setOpened] = useState(false);
    
    return (
		<div
        className={clsx(
        "flex gap-[3.3vw] flex-col",
        "bp700px:gap-[1.71vw]",
        "bp1200px:gap-[12px]"
        )}
        >
            <button
            onClick={() => setOpened(!isOpened)}
            className={clsx(
            "increase_hover_anim hover:cursor-pointer w-fit"
            )}
            >
                <div
                className={clsx(
                "flex gap-[3.3vw] items-center",
                "bp700px:gap-[1.71vw]",
                "bp1200px:gap-[12px]"
                )}
                >
                    <HalfArrowIcon
                    svg_className={clsx(
                    "transition-transform duration-[400ms]",
                    "w-[5.5vw] h-[5.5vw]",
                    "bp700px:w-[5.71vw] bp700px:h-[5.71vw]",
                    "bp1200px:w-[40px] bp1200px:h-[40px]",
                    isOpened ? "rotate-90" : "rotate-270"
                    )}
                    path_className="stroke-texticon_base_header"
                    />

                    <h2
                    className={clsx(
                    "label_l2 text-texticon_base_header select-none"
                    )}
                    >{title}</h2>
                </div>
            </button>

			{/* Враппер ячеек */}
            <AnimatePresence
            initial={false}
            mode="wait"
            >
                {isOpened && 
                <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                >
					{children}
				</motion.div>}
			</AnimatePresence>
		</div>
    )
}

export { Accordion };

type TAccordionProps = {
	title: string;
	children: React.ReactNode;
}