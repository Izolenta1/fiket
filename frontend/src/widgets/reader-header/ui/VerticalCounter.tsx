import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";

const VerticalCounter = ({ currentPage, pagesCount }: TVerticalCounterProps) => {
    return (
        <AnimatePresence
        mode="wait"
        >
            <div
            className={clsx(
            "flex items-center gap-[1.1vw] justify-self-end",
            "caption_regular text-texticon_base_subheader",
            "bp700px:gap-[0.57vw]",
            "bp1200px:gap-[4px]"
            )}
            >
                <motion.span
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                >{pagesCount ? Math.round((currentPage + 1) / pagesCount * 100) : "null"}</motion.span>

                <span>%</span>
            </div>
        </AnimatePresence>
    )
}

export { VerticalCounter };

type TVerticalCounterProps = {
    currentPage: number,
    pagesCount: number
}