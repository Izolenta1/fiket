import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";

const CarouselSlide = ({ children, classNames }: TCardSlideProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <div
        className={clsx(
        "embla__slide shrink-0 grow-0",
        merge("root")
        )}
        >
            <div
            className={clsx(
            merge("wrapper")
            )}
            >{children}</div>
        </div>
    );
}

export { CarouselSlide };

type TCardSlideClassNames = {
	root?: string;
    wrapper?: string;
};

type TCardSlideProps = {
    children: React.ReactNode,
    classNames?: TCardSlideClassNames;
};

const defaultClassNames: Required<TCardSlideClassNames> = {
	root: "pl-[2.7vw] bp700px:pl-[4.57vw] bp1200px:pl-[32px]",
    wrapper: "w-[27.7vw] bp700px:w-[25.71vw] bp1200px:w-[180px]"
};