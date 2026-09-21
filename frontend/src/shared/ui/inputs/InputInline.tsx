import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { PencilIcon } from "../icons";

const InputInline = ({ value, ...props }: IInputProps) => {
    return (
        <div
        className={clsx(
        "relative",
        "flex items-center grow"
        )}
        >
            <input
            type="text"
            value={value}
            {...props}
            className={clsx(
            "transition-color duration-[400ms]",
            "input_regular text-texticon_base_default placeholder:text-texticon_base_unactive caret-texticon_base_accent",
            "peer outline-0 w-full pb-[0.5vw]",
            "border-b-[0.27vw] border-texticon_base_default focus:border-texticon_base_accent",
            "bp700px:pb-[0.29vw] bp700px:border-b-[0.14vw]",
            "bp1200px:pb-[2px] bp1200px:border-b-[1px]"
            )}
            />

            {!value &&
            <PencilIcon
            svg_className={clsx(
            "transition-opacity duration-[400ms]",
            "absolute right-0 top-0 bottom-0 my-auto",
            "w-[3.3vw] h-[3.3vw]",
            "pointer-events-none peer-focus:opacity-0",
            "bp700px:w-[1.71vw] bp700px:h-[1.71vw]",
            "bp1200px:w-[12px] bp1200px:h-[12px]"
            )}
            path_className={clsx(
            "fill-texticon_base_default"
            )}
            />}
        </div>
    );
};

export { InputInline };

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    additionalText?: string;
    error?: string
};