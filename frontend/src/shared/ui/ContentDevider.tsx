import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";

const ContentDevider = ({ classNames }: TContentDeviderProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

	return (
		<div
		className={clsx(
		merge("root"),
		`h-[1px] rounded-[50px]`
		)}
		/>
	);
};

export { ContentDevider };

type TContentDeviderClassNames = {
	root?: string;
};

type TContentDeviderProps = {
	classNames?: TContentDeviderClassNames;
};

const defaultClassNames: Required<TContentDeviderClassNames> = {
	root: "bg-texticon_base_default",
};
