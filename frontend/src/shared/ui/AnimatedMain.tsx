import { motion } from "framer-motion";
import clsx from "clsx";

const AnimatedMain = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={clsx(
        "flex justify-center grow",
        "px-[5.5vw] py-[5.5vw]",
        "w-full min-h-[222.2vw]",
        "bp700px:px-[5.71vw] bp700px:py-[2.86vw] bp700px:min-h-[114.29vw]",
        "bp1200px:px-[0px] bp1200px:py-[40px] bp1200px:min-h-[800px]"
        )}
        >
            <div
            className={clsx(
            "flex flex-col gap-[5.5vw] w-full",
            "bp700px:gap-[4.57vw]",
            "bp1200px:gap-[32px] bp1200px:max-w-[1040px]"
            )}
            >
                {children}
            </div>
        </motion.main>
    )
}

export { AnimatedMain }