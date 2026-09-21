import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import { InputInline } from "@/shared/ui";

const ProfilePollInput = ({ title, subText, options, onChange, availability = true, error }: TProfilePollInputProp) => {
	const handleChange = (index: number, value: string) => {
		const newOptions = [...options];
		newOptions[index] = value;

		// Если редактируется последний инпут и введено что-то, добавляем новый
		if (index === options.length - 1 && value.trim() !== "" && options.length < 10) {
			newOptions.push("");
		}

        // Если последние два поля пустые, удаляем последнее
        const last = newOptions.length - 1;
        if (newOptions.length > 2 && newOptions[last].trim() === '' && newOptions[last - 1].trim() === '') {
            newOptions.pop();
        }

		onChange(newOptions);
	};

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
                "mt-[2.2vw]",
                "flex flex-col gap-[3.3vw]",
                "bp700px:gap-[1.71vw] bp700px:mt-[1.14vw]",
                "bp1200px:gap-[12px] bp1200px:mt-[8px]"
                )}
                >
                    {options.map((option, idx) => (
                        <div
                        key={idx}
                        className={clsx(
                        "relative mt-auto"
                        )}
                        >
                            <InputInline
                            placeholder={`#${idx + 1} пункт`}
                            value={option}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            />
                        </div>
                    ))}
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

export { ProfilePollInput };

type TProfilePollInputProp = {
	title: string;
	subText: string;
    options: string[];
    onChange: (value: string[]) => void;
    availability?: boolean;
    error?: string
};