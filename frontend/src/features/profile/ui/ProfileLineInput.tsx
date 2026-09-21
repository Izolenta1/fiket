import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";

const ProfileLineInput = ({ title, subText, baseValues, value, onChange, availability = true, error }: TProfileLineInputProp) => {
    const max = baseValues[baseValues.length - 1].value;
    const progress = (Number(value) / Number(max)) * 100;
    
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
                "mt-auto",
                "flex flex-col gap-[1.1vw]",
                "bp700px:gap-[0.57vw]",
                "bp1200px:gap-[4px]"
                )}
                >
                    <div
                    className={clsx(
                    "relative"
                    )}
                    >
                        {/* Серая основа */}
                        <div
                        className={clsx(
                        "absolute top-0 bottom-0 my-auto",
                        "h-[0.5vw] w-full",
                        "bg-texticon_base_default rounded-full",
                        "bp700px:h-[0.29vw]",
                        "bp1200px:h-[2px]"
                        )}
                        />

                        {/* Желтый прогресс */}
                        <motion.div
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={clsx(
                        "absolute top-0 bottom-0 my-auto",
                        "h-[0.5vw]",
                        "bg-texticon_base_accent rounded-full",
                        "bp700px:h-[0.29vw]",
                        "bp1200px:h-[2px]"
                        )}
                        />

                        {/* Точки */}
                        <div
                        className={clsx(
                        "relative",
                        "flex justify-between w-full"
                        )}
                        >
                            {baseValues.map((point) => (
                            <button
                            key={point.value}
                            type="button"
                            onClick={() => onChange(point.value)}
                            className={clsx(
                            "relative",
                            "increase_hover_anim hover:cursor-pointer"
                            )}
                            >
                                <div
                                className={clsx(
                                "transition-color duration-[400ms]",
                                "w-[2.2vw] h-[2.2vw]",
                                "rounded-full",
                                "bp700px:w-[1.71vw] bp700px:h-[1.71vw]",
                                "bp1200px:w-[12px] bp1200px:h-[12px]",
                                Number(value) >= Number(point.value) ? "bg-texticon_base_accent" : "bg-texticon_base_default"
                                )}
                                />

                                <div
                                className={clsx(
                                "absolute -inset-[3.3vw]",
                                "rounded-full",
                                "bp700px:-inset-[2.29vw]",
                                "bp1200px:-inset-[16px]"
                                )}
                                />
                            </button>
                            ))}
                        </div>
                    </div>

                    {/* Письменные значения */}
                    <div
                    className={clsx(
                    "flex justify-between w-full"
                    )}
                    >
                        {baseValues.map((point) => (
                        <span
                        key={point.value}
                        className={clsx(
                        "transition-color duration-[400ms]",
                        "caption_regular select-none",
                        Number(value) >= Number(point.value) ? "text-texticon_base_accent" : "text-texticon_base_default"
                        )}
                        >
                            {point.label}
                        </span>
                        ))}
                    </div>
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

export { ProfileLineInput };

type TProfileLineInputProp = {
	title: string;
	subText: string;
    baseValues: {
        value: string;
        label: string
    }[];
    value: string;
    onChange: (value: string) => void;
    availability?: boolean;
    error?: string
};