import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const ContentButton = ({ name, condition, ...props }: IContentButtonProps) => {
    return (
        <button
        {...props}
        className={clsx(
        "increase_hover_anim hover:cursor-pointer"
        )}
        >
            <div
            className={clsx(
            "transition-all duration-[400ms]",
            "button_regular text-start select-none",
            "p-[3.3vw]",
            "bg-surface_body rounded-[3.3vw]",
            "bp700px:p-[1.71vw] bp700px:rounded-[1.71vw]",
            "bp1200px:p-[12px] bp1200px:rounded-[12px]",
            condition ? "text-texticon_base_accent !font-[700]" : "text-texticon_base_subheader"
            )}
            >{name}</div>
        </button>
    )
}

export { ContentButton };

interface IContentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string,
    condition: boolean
}