import { FiketTextIcon } from "./icons";
import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";

const NoDataPlug = ({ classNames, text }: TNoDataPlugProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <div
        className={clsx(
        merge("root"),
        "select-none col-span-full",
        "relative w-full flex flex-col items-center",
        "p-[3.3vw]",
        "bp700px:p-[1.71vw]",
        "bp1200px:p-[12px]"
        )}
        >
            <FiketTextIcon
            svg_className={clsx(
            "w-auto h-full absolute inset-0 m-auto"
            )}
            path_className={clsx(
            "fill-decor_oreol opacity-[0.5]"
            )}
            />

            <span
            className={clsx(
            "label_l1 text-texticon_base_header"
            )}
            >Пу - Пу - Пу</span>

            <p
            className={clsx(
            "caption_regular text-texticon_base_default text-center"
            )}
            >{text}</p>
        </div>
    );
};

export { NoDataPlug };

type TNoDataPlugClassNames = {
	root?: string;
};

type TNoDataPlugProps = {
	classNames?: TNoDataPlugClassNames;
    text: string;
};

const defaultClassNames: Required<TNoDataPlugClassNames> = {
	root: "",
};