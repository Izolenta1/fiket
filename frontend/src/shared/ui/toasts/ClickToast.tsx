import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";
import { mergeObjectClassNames } from "@/shared/lib";
import { motion } from "framer-motion";

const ClickToast = ({ toast, classNames }: TClickToastProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
        className={clsx(
        `absolute select-none ${merge("root")}`,
        "bg-surface_body border-[0.27vw] border-border_hard rounded-[3.3vw]",
        "py-[2.2vw] px-[3.3vw]",
        "caption_regular text-texticon_base_header",
        "bp700px:border-[0.14vw] bp700px:py-[1.14vw] bp700px:px-[1.71vw] bp700px:rounded-[1.71vw]",
        "bp1200px:border-[1px] bp1200px:py-[12px] bp1200px:px-[16px] bp1200px:rounded-[12px]"
        )}
        style={{
            zIndex: Z_INDEX.clickToast
        }}
        >{toast.message}</motion.div>
    )
}

export { ClickToast };

type TClickToastClassNames = {
	root?: string;
};

type TClickToastProps = {
	toast: { message: string },
    classNames?: TClickToastClassNames;
};

const defaultClassNames: Required<TClickToastClassNames> = {
	root: "b-top-[60px] left-0",
};