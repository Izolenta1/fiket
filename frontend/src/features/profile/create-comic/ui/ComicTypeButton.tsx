import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { ArrowUpDownIcon } from "@/shared/ui";

const ComicTypeButton = ({ value, text, buttonType, ...props }: IComicTypeButtonProps) => {
    return (
        <button
        type="button"
        {...props}
        className={clsx(
        "decrease_hover_anim hover:cursor-pointer w-full select-none"
        )}
        >
            <div
            className={clsx(
            "embla__slide",
            "transition-color duration-[400ms]",
            "flex gap-[1.1vw] justify-center items-center",
            "bg-surface_body rounded-[3.3vw] border-[0.27vw]",
            "px-[4.4vw] py-[2.2vw]",
            "bp700px:gap-[0.57vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw] bp700px:px-[2.29vw] bp700px:py-[1.14vw]",
            "bp1200px:gap-[4px] bp1200px:rounded-[12px] bp1200px:border-[1px] bp1200px:px-[16px] bp1200px:py-[12px]",
            buttonType === value ? "border-texticon_base_accent text-texticon_base_accent" : "border-transparent text-texticon_base_header"
            )}
            >
                <ArrowUpDownIcon
                svg_className={clsx(
                "w-[4.4vw] h-[4.4vw]",
                "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                "bp1200px:w-[16px] bp1200px:h-[16px]",
                buttonType === "HORIZONTAL" && "rotate-90"
                )}
                path_className={clsx(
                "transition-all duration-[400ms]",
                buttonType === value ? "stroke-texticon_base_accent" : "stroke-texticon_base_header"
                )}
                />
                
                <span
                className={clsx(
                "button_regular"
                )}
                >{text}</span>
            </div>
        </button>
    );
};

export { ComicTypeButton };

interface IComicTypeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: "VERTICAL" | "HORIZONTAL",
    text: "Вертикально" | "Горизонтально",
    buttonType: "VERTICAL" | "HORIZONTAL"
}