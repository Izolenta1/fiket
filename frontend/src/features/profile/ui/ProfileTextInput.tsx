import { PencilIcon } from "@/shared/ui";
import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import { useRef, useEffect } from "react";

const ProfileTextInput = ({ title, subText, placeholder, charLimit, value, onChange, availability = true, error }: TProfileTextInputProp) => {
    const textRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
		if (textRef.current) {
			textRef.current.style.height = "auto";
			textRef.current.style.height = textRef.current.scrollHeight + "px";
		}
    }, [value])

    return (
        <section
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "bp700px:gap-[1.71vw]",
        "bp1200px:gap-[12px]"
        )}
        >
            <div
            className={clsx(
            "transition-color duration-[400ms]",
            "relative",
            "flex flex-col gap-[1.1vw] min-h-[33.3vw]",
            "p-[3.3vw]",
            "bg-surface_container border-[0.27vw] rounded-[3.3vw] overflow-hidden",
            "bp700px:gap-[0.57vw] bp700px:min-h-[25.71vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:gap-[4px] bp1200px:min-h-[180px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]",
            error ? "border-texticon_base_warning" : "border-border_default"
            )}
            >
                <h2
                className={clsx(
                "label_l3 text-texticon_base_header select-none"
                )}
                >{title}</h2>

                <p
                className={clsx(
                "caption_regular text-texticon_base_default select-none"
                )}
                >{subText}</p>

                <div
                className={clsx(
                "flex flex-col gap-[0.5vw]",
                "mt-auto",
                "bp700px:gap-[0.29vw]",
                "bp1200px:gap-[2px]"
                )}
                >
                    <div
                    className={clsx(
                    "relative text-[0px]"
                    )}
                    >
                        <textarea
                        ref={textRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={charLimit}
                        rows={1}
                        spellCheck="false"
                        placeholder={placeholder}
                        className={clsx(
                        "transition-color duration-[400ms]",
                        "peer outline-0 resize-none w-full pb-[0.5vw]",
                        "input_regular text-texticon_base_default placeholder:text-texticon_base_unactive caret-texticon_base_accent",
                        "border-b-[0.27vw] border-texticon_base_default focus:border-texticon_base_accent overflow-hidden",
                        "bp700px:pb-[0.29vw] bp700px:border-b-[0.14vw]",
                        "bp1200px:pb-[2px] bp1200px:border-b-[1px]",
                        )}
                        />
                        
                        {!value &&
                        <PencilIcon
                        svg_className={clsx(
                        "transition-opacity duration-[400ms]",
                        "w-[3.3vw] h-[3.3vw]",
                        "absolute right-0 top-0 bottom-0",
                        "my-auto pointer-events-none peer-focus:opacity-0",
                        "bp700px:w-[1.71vw] bp700px:h-[1.71vw]",
                        "bp1200px:w-[12px] bp1200px:h-[12px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_default"
                        )}
                        />}
                    </div>

                    <span
                    className={clsx(
                    "input_regular text-texticon_base_unactive text-end select-none"
                    )}
                    >{value.length} / {charLimit}</span>
                </div>

                <AnimatePresence
                initial={false}
                mode="wait"
                >
                    {!availability &&
                    <motion.div
                    key={availability.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-surface_body"
                    />}
                </AnimatePresence>
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
            )}>{error}</motion.span>}
        </section>
    );
};

export { ProfileTextInput };

type TProfileTextInputProp = {
	title: string;
	subText: string;
	placeholder: string;
    charLimit: number;
    value: string;
    onChange: (value: string) => void;
    availability?: boolean;
    error?: string
};