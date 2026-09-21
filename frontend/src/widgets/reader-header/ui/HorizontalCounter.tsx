import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";

const HorizontalCounter = ({ currentPage, pagesCount }: THorizontalCounterProps) => {
    return (
        <AnimatePresence
        mode="wait"
        >
            <div
            className={clsx(
            "flex items-center justify-self-end",
            "caption_regular text-texticon_base_subheader",
            )}
            >
                <motion.span
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                >{currentPage + 1}</motion.span>

                <span>/{pagesCount}</span>
            </div>
        </AnimatePresence>
    )
}

export { HorizontalCounter };

type THorizontalCounterProps = {
    currentPage: number,
    pagesCount: number
}