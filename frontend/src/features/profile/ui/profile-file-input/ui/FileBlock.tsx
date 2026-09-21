import { XmarkIcon } from "@/shared/ui";
import { motion } from "framer-motion";
import clsx from "clsx";

const FileBlock = ({ fileName, onDelete }: TFileBlockProps) => {
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div
            className={clsx(
            "increase_hover_anim"
            )}
            >
                <span
                className={clsx(
                "flex gap-[1.1vw] w-fit",
                "bg-surface_body rounded-[2.2vw]",
                "px-[2.2vw] py-[1.1vw]",
                "input_regular text-texticon_base_default select-none",
                "bp700px:px-[1.43vw] bp700px:py-[0.86vw] bp700px:gap-[0.57vw] bp700px:rounded-[1.14vw]",
                "bp1200px:px-[12px] bp1200px:py-[8px] bp1200px:gap-[4px] bp1200px:rounded-[8px]"
                )}
                >
                    {fileName.length > 30 ? fileName.slice(0, 30) + "..." : fileName}

                    <button
                    onClick={() => onDelete(fileName)}
                    type="button"
                    className={clsx(
                    "hover:cursor-pointer"
                    )}
                    >
                        <XmarkIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                        "bp1200px:w-[24px] bp1200px:h-[24px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_default"
                        )}
                        />
                    </button>
                </span>
            </div>
        </motion.div>
    );
};

export { FileBlock };

type TFileBlockProps = {
    fileName: string,
    onDelete: (fileName: string) => void
}