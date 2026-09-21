import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import { AddFileButton } from "./AddFileButton";
import { FileBlock } from "./FileBlock";
import { type ChangeEvent } from "react";

const ProfileFileInput = ({ title, subText, fileExt, maxFiles, value, onChange, availability = true, error }: TProfileFileInputProp) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files ?? []);

        const filteredNewFiles = newFiles.filter(newFile =>
            !value.some((file: File) => file.name === newFile.name) &&
            fileExt.includes("." + newFile.name.split(".").pop())
        );

        onChange([...value, ...filteredNewFiles].slice(0, maxFiles));

        event.target.value = "";
    };

    const removeFile = (fileName: string) => {
        onChange(value.filter((file: File) => file.name !== fileName));
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
                "caption_regular text-texticon_base_default select-none whitespace-pre-wrap"
                )}
                >{subText}</p>

                <div
                className={clsx(
                "relative mt-auto text-[0px]",
                "flex flex-wrap gap-[2.2vw]",
                "bp700px:gap-[1.14vw]",
                "bp1200px:gap-[8px]"
                )}
                >
                    <AnimatePresence
                    initial={false}
                    >
                        {value.length !== maxFiles && 
                        <AddFileButton
                        handleFileChange={handleFileChange}
                        fileExtensions={fileExt}
                        />}

                        {value.map((file: File) =>
                        <FileBlock
                        key={file.name + file.size}
                        fileName={file.name}
                        onDelete={(fileName) => removeFile(fileName)}
                        />)}
                    </AnimatePresence>
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

export { ProfileFileInput };

type TProfileFileInputProp = {
	title: string;
	subText: string;
    fileExt: string[];
    maxFiles: number;
    value: File[];
    onChange: (newFiles: File[]) => void,
    availability?: boolean;
    error?: string
};