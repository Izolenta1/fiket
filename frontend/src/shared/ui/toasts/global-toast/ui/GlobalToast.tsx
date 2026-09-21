import { useEffect, useEffectEvent } from "react";
import { useGlobalToast } from "@/global/providers";
import clsx from "clsx";
import { CircleCheckIcon } from "../../../icons";
import { CircleCrossIcon } from "../../../icons";
import { XmarkIcon } from "../../../icons";
import { motion } from 'framer-motion'
import { TGlobalToast } from "../model/types";

const GlobalToast = ({ toast }: TGlobalToastProps) => {
    const { deleteToast } = useGlobalToast()
    
    const deleteToastEvent = useEffectEvent(() => {
        deleteToast(toast.id);
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            deleteToastEvent()
        }, 10000); // 10 секунд

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
        key={toast.id}
        layout
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ layout: { type: "spring", stiffness: 500, damping: 30 }, duration: 0.4, ease: "easeInOut" }}
        className={clsx(
        "w-[88.8vw] flex gap-[3.3vw] items-center justify-center",
        "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
        "p-[3.3vw]",
        "bp700px:w-[60vw] bp700px:gap-[1.71vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw] bp700px:p-[1.71vw]",
        "bp1200px:w-[540px] bp700px:gap-[12px] bp700px:rounded-[12px] bp700px:border-[1px] bp700px:p-[12px]"
        )}
        >
            {toast.type === "positive"
            ? <CircleCheckIcon
            svg_className={clsx(
            "w-[6.6vw] h-[6.6vw] shrink-0",
            "stroke-texticon_base_approved",
            "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
            "bp1200px:w-[24px] bp1200px:h-[24px]"
            )}
            />
            : <CircleCrossIcon
            svg_className={clsx(
            "w-[6.6vw] h-[6.6vw] shrink-0",
            "stroke-texticon_base_warning",
            "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
            "bp1200px:w-[24px] bp1200px:h-[24px]"
            )}
            />
            }

            <span
            className={clsx(
            "grow",
            "caption_regular text-texticon_base_default"
            )}
            >{toast.text}</span>

            <button
            onClick={() => deleteToast(toast.id)}
            className={clsx(
            "self-start cursor-pointer"
            )}
            >
                <XmarkIcon
                svg_className={clsx(
                "w-[6.6vw] h-[6.6vw]",
                "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                "bp1200px:w-[24px] bp1200px:h-[24px]"
                )}
                path_className={clsx(
                "stroke-texticon_base_default"
                )}
                />
            </button>
        </motion.div>
    );
};

export { GlobalToast };

type TGlobalToastProps = {
    toast: TGlobalToast
};