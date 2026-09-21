import clsx from "clsx";
import { ToggleSwitch } from "../toggle/ToggleSwitch";
import { motion } from "framer-motion";

const InputAgreement = ({ value, falseCallback, trueCallback, error, children }: TInputAgreementProps) => {
    return (
        <div
        className={clsx(
        "w-full flex flex-col gap-[1.1vw]",
        "bp700px:gap-[0.57vw]",
        "bp1200px:gap-[4px]"
        )}
        >
            <div
            className={clsx(
            "flex items-center self-start gap-[2.2vw]",
            "bp700px:gap-[1.14vw]",
            "bp1200px:gap-[8px]"
            )}
            >
                <ToggleSwitch
                isToggled={value}
                trueCallback={trueCallback}
                falseCallback={falseCallback}
                error={error}
                />

                <div
                className={clsx(
                "flex flex-col"
                )}
                >
                    { children }
                </div>
            </div>

            {error &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit",
            "px-[3.3vw]",
            "caption_regular text-texticon_base_warning",
            "bp700px:px-[1.71vw]",
            "bp1200px:px-[12px]"
            )}>{error}</motion.span>
            }
        </div>
    );
};

export { InputAgreement };

type TInputAgreementProps = {
    value: boolean,
    falseCallback: () => void;
    trueCallback: () => void;
    children: React.ReactNode;
    error?: string
}