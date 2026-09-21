import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const ScrollbarWrapper = ({ children, classNames }: TScrollbarWrapperProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <SimpleBar
        autoHide={false}
        className={clsx(
        merge("root"),
        )}
        >
            <div
            className={clsx(
            merge("wrapper")
            )}
            >
                {children}
            </div>
        </SimpleBar>
    )
}

export { ScrollbarWrapper }

type TScrollbarWrapperClassNames = {
	root?: string;
    wrapper?: string;
};

type TScrollbarWrapperProps = {
	children: React.ReactNode,
    classNames?: TScrollbarWrapperClassNames;
};

const defaultClassNames: Required<TScrollbarWrapperClassNames> = {
	root: "max-h-[69.4vw] bp700px:max-h-[35.71vw] bp1200px:max-h-[250px]",
    wrapper: "flex flex-col gap-[1.1vw] bp700px:gap-[0.57vw] bp1200px:gap-[4px]"
};