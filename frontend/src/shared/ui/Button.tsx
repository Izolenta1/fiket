import type { ButtonHTMLAttributes } from "react";
import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";

const Button = ({ text, variant = "primary", classNames, ...props }: IButtonProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <button
        className={clsx(
        merge("wrapper"),
        variant !== "carousel" ? "w-full" : "w-fit",
        variant !== "ghost" && `${variant === "primaryAlt" ? "decrease_hover_anim" : "increase_hover_anim"} hover:cursor-pointer`
        )}
        {...props}
        >
            <div
            className={clsx(
            merge("root"),
            "select-none transition-colors duration-400",
            variants[variant]
            )}
            >{text}</div>
        </button>
    );
};

export { Button };

type TButtonClassNames = {
	wrapper?: string;
    root?: string;
};

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: keyof typeof variants;
    classNames?: TButtonClassNames;
}

const defaultClassNames: Required<TButtonClassNames> = {
	wrapper: "",
    root: "",
};

const variants = {
    primary: clsx(
        "button_regular text-texticon_base_accent text-nowrap",
        "w-full flex justify-center items-center",
        "py-[2.2vw] px-[4.4vw]",
        "border-[0.27vw] border-texticon_base_accent rounded-[3.3vw] bg-surface_body",
        "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:py-[12px] bp1200px:px-[16px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
    ),
    primaryAlt: clsx(
        "button_regular text-texticon_base_subheader text-nowrap",
        "w-full flex justify-center items-center",
        "py-[2.2vw] px-[4.4vw]",
        "border-[0.27vw] border-texticon_base_subheader rounded-[3.3vw] bg-surface_body",
        "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:py-[12px] bp1200px:px-[16px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
    ),
    secondary: clsx(
        "button_regular text-texticon_base_subheader",
        "px-[4.4vw] py-[2.2vw]",
        "grow w-full",
        "bp700px:px-[2.29vw] bp700px:py-[1.14vw]",
        "bp1200px:px-[16px] bp1200px:py-[12px]"
    ),
    secondaryAlt: clsx(
        "button_regular text-texticon_base_header text-nowrap",
        "w-full flex justify-center items-center",
        "py-[2.2vw] px-[4.4vw]",
        "rounded-[3.3vw] border-[0.27vw] border-transparent bg-surface_body",
        "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:py-[12px] bp1200px:px-[16px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
    ),
    carousel: clsx(
        "addiction_regular text-texticon_base_accent",
        "h-fit w-fit"
    ),
    warning: clsx(
        "button_regular text-texticon_base_warning text-nowrap",
        "w-full flex justify-center items-center",
        "py-[2.2vw] px-[4.4vw]",
        "border-[0.27vw] border-texticon_base_warning rounded-[3.3vw] bg-surface_body",
        "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:py-[12px] bp1200px:px-[16px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
    ),
    ghost: clsx(
        "button_regular text-texticon_base_default text-nowrap",
        "w-full flex justify-center items-center",
        "py-[2.2vw] px-[4.4vw]",
        "border-[0.27vw] border-texticon_base_default rounded-[3.3vw] bg-surface_body",
        "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:py-[12px] bp1200px:px-[16px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
    )
}