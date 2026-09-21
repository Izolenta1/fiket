import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";
import { Z_INDEX } from "../config";

const GlassBackground = ({ children, classNames }: TGlassBackgroundProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);
    
    return (
        <div
        className={clsx(
        merge("root"),
        "relative"
        )}
        >
            {children}
            <div
            className={clsx(
            merge("background"),
            "absolute inset-0 m-auto",
            "bg-surface_container border-[0.27vw] border-border_default",
            "backdrop-blur-[6px]",
            "bp700px:border-[0.14vw]",
            "bp1200px:border-[1px]"
            )}
            style={{
                zIndex: Z_INDEX.glassBackground
            }}
            />
        </div>
    )
}

export { GlassBackground };

type TGlassBackgroundClassNames = {
	root?: string;
    background?: string
};

type TGlassBackgroundProps = {
    children: React.ReactNode;
    classNames?: TGlassBackgroundClassNames;
}

const defaultClassNames: Required<TGlassBackgroundClassNames> = {
	root: "w-fit",
    background: "rounded-full"
};