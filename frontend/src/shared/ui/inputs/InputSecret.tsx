'use client'

import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StrokeEyeIcon } from "../icons";
import { CrossStrokeEyeIcon } from "../icons";

const InputSecret = ({ additionalText, error, ...props }: IInputProps) => {
    const [showed, setShowed] = useState(false)
    
    return (
        <div
        className={clsx(
        "w-full flex flex-col gap-[1.1vw]",
        "bp700px:gap-[0.57vw]",
        "bp1200px:gap-[4px]"
        )}
        >
            <div
            className={clsx(
            "flex"
            )}
            >
                <input
                className={clsx(
                `outline-0 select-none grow transition-colors duration-400`,
                "bg-surface_body rounded-l-[3.3vw] border-y-[0.27vw] border-l-[0.27vw]",
                "p-[3.3vw]",
                "input_regular text-texticon_base_header caret-texticon_base_accent placeholder:text-texticon_base_default",
                "bp700px:border-y-[0.14vw] bp700px:border-l-[0.14vw] bp700px:p-[1.71vw] bp700px:rounded-l-[1.71vw]",
                "bp1200px:border-y-[1px] bp1200px:border-l-[1px] bp1200px:p-[12px] bp1200px:rounded-l-[12px]",
                error ? "border-texticon_base_warning" : "border-transparent"
                )}
                type={showed ? "text" : "password"}
                autoComplete="off"
                {...props}
                />

                <button
                className={clsx(
                "hover:cursor-pointer transition-colors duration-400",
                "p-[3.3vw] pl-0",
                "bg-surface_body rounded-r-[3.3vw] border-y-[0.27vw] border-r-[0.27vw]",
                "bp700px:p-[1.71vw] bp700px:rounded-r-[1.71vw] bp700px:border-y-[0.14vw] bp700px:border-r-[0.14vw]",
                "bp1200px:p-[12px] bp1200px:rounded-r-[12px] bp1200px:border-y-[1px] bp1200px:border-r-[1px]",
                error ? "border-texticon_base_warning" : "border-transparent"
                )}
                type="button"
                onClick={() => setShowed(!showed)}
                >
                    <AnimatePresence
                    initial={false}
                    mode="popLayout"
                    >
                        <motion.div
                        key={showed.toString()}
                        initial={{ opacity: 0, scale: 1.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {showed
                            ? <StrokeEyeIcon
                            svg_className={clsx(
                            "increase_hover_anim",
                            "w-[4.4vw] h-[4.4vw]",
                            "bp700px:w-[2.86vw] bp700px:h-[2.86vw]",
                            "bp1200px:w-[24px] bp1200px:h-[24px]"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_unactive"
                            )}
                            />
                            : <CrossStrokeEyeIcon
                            svg_className={clsx(
                            "increase_hover_anim",
                            "w-[4.4vw] h-[4.4vw]",
                            "bp700px:w-[2.86vw] bp700px:h-[2.86vw]",
                            "bp1200px:w-[24px] bp1200px:h-[24px]"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_unactive"
                            )}
                            />}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </div>

            {additionalText &&
            <span
            className={clsx(
            "select-none",
            "px-[3.3vw]",
            "caption_regular text-texticon_base_default",
            "bp700px:px-[1.71vw]",
            "bp1200px:px-[12px]"
            )}>{additionalText}</span>
            }

            {error &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit",
            "px-[3.3vw]",
            "caption_regular text-texticon_base_warning",
            "bp700px:px-[1.71vw]",
            "bp1200px:px-[12px]"
            )}>{error}</motion.span>
            }
        </div>
    );
};

export { InputSecret };

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    additionalText?: string;
    error?: string;
};