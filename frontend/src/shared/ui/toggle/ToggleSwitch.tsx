import clsx from "clsx";
import { motion } from "framer-motion";

const ToggleSwitch = ({ isToggled, falseCallback, trueCallback, error }: ToggleSwitchProps) => {
    function toggleFunction() {
        if (isToggled && falseCallback) falseCallback();
        else if (!isToggled && trueCallback) trueCallback();
    }

    return (
        <button
        onClick={toggleFunction}
        type="button"
        className={clsx(
        "increase_hover_anim hover:cursor-pointer"
        )}
        >
            <div
            className={clsx(
            "transition-color duration-[400ms]",
            "w-[8.8vw] h-[4.4vw]",
            "px-[0.5vw]",
            "flex items-center shrink-0",
            "rounded-full",
            "bp700px:w-[5.14vw] bp700px:h-[2.57vw] bp700px:px-[0.29vw]",
            "bp1200px:w-[40px] bp1200px:h-[20px] bp1200px:px-[2px]",
            isToggled ? "bg-texticon_profile" : "bg-texticon_base_unactive",
            isToggled ? "justify-end" : "",
            error ? "border-texticon_base_warning" : "border-transparent"
            )}
            >
                <motion.div
                layout
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                >
                    <div
                    className={clsx(
                    "transition-color duration-[400ms]",
                    "w-[3.3vw] h-[3.3vw]",
                    "rounded-full",
                    "bp700px:w-[2vw] bp700px:h-[2vw]",
                    "bp1200px:w-[14px] bp1200px:h-[14px]",
                    isToggled ? "bg-texticon_base_header" : "bg-texticon_base_default",
                    )}
                    />
                </motion.div>
            </div>
        </button>
    )
}

export { ToggleSwitch };

type ToggleSwitchProps = {
    isToggled: boolean;
    falseCallback?: () => void;
    trueCallback?: () => void;
    error?: string
};