import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

const Input = ({ additionalText, error, ...props }: IInputProps) => {
    return (
        <div
        className={clsx(
        "w-full flex flex-col gap-[1.1vw]",
        "bp700px:gap-[0.57vw]",
        "bp1200px:gap-[4px]"
        )}
        >
            <input
            className={clsx(
            "outline-0 select-none transition-colors duration-400",
            "bg-surface_body rounded-[3.3vw] border-[0.27vw]",
            "p-[3.3vw]",
            "input_regular text-texticon_base_header caret-texticon_base_accent placeholder:text-texticon_base_default",
            "bp700px:border-[0.14vw] bp700px:p-[1.71vw] bp700px:rounded-[1.71vw]",
            "bp1200px:border-[1px] bp1200px:p-[12px] bp1200px:rounded-[12px]",
            error ? "border-texticon_base_warning" : "border-transparent"
            )}
            autoComplete="off"
            {...props}
            />

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

export { Input };

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    additionalText?: string;
    error?: string
};