import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";
import { LoadingCircleIcon } from "./icons";

const LoadingBlock = ({ classNames }: TLoadingBlockProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);
    
    return (
        <div
        className={clsx(
        merge("root"),
        "flex justify-center items-center",
        "p-[1.1vw]",
        "bp700px:p-[0.57vw]",
        "bp1200px:p-[4px]"
        )}
        >
            <LoadingCircleIcon
            svg_className={clsx(
            merge("icon"),
            "animate-spin",
            )}
            />
        </div>
    );
}

export { LoadingBlock }

type TLoadingBlockClassNames = {
	root?: string;
    icon?: string
};

type TLoadingBlockProps = {
	classNames?: TLoadingBlockClassNames;
};

const defaultClassNames: Required<TLoadingBlockClassNames> = {
	root: "",
    icon: "w-[8.8vw] h-[8.8vw] bp700px:w-[6.86vw] bp700px:h-[6.86vw] bp1200px:w-[48px] bp1200px:h-[48px]"
};