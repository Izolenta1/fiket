import { useId } from "react";
import { PlusIcon } from "@/shared/ui";
import type { ChangeEvent } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const AddFileButton = ({ handleFileChange, fileExtensions }: TAddFileButtonProps) => {
    const id = useId()
    
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <label
            htmlFor={id}
            className={clsx(
            "increase_hover_anim hover:cursor-pointer",
            "p-[1.1vw]",
            "bg-surface_body rounded-[2.2vw]",
            "bp700px:p-[0.86vw] bp700px:rounded-[1.14vw]",
            "bp1200px:p-[8px] bp1200px:rounded-[8px]"
            )}
            >
                <PlusIcon
                svg_className={clsx(
                "w-[4.4vw] h-[4.4vw]",
                "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                "bp1200px:w-[24px] bp1200px:h-[24px]"
                )}
                path_className={clsx(
                "stroke-texticon_base_default"
                )}
                />

                <input
                id={id}
                type="file"
                multiple
                className={clsx(
                "hidden"
                )}
                onChange={handleFileChange}
                accept={fileExtensions.join(",")}
                />
            </label>
        </motion.div>
    );
};

export { AddFileButton };

type TAddFileButtonProps = {
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    fileExtensions: string[]
}