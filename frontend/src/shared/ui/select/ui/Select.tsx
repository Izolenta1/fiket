'use client'

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { mergeObjectClassNames } from "@/shared/lib";
import { MicroHalfArrowIcon } from "../../icons";
import { ScrollbarWrapper } from "../../ScrollbarWrapper";
import { AnimatePresence, motion } from 'framer-motion'
import { SelectItem } from "./SelectItem";
import { TSelectOption } from "../model";
import { TSelectValue } from "../model";
import { useClickOutside } from "@/shared/lib";
import { Z_INDEX } from "@/shared/config";

const Select = <T extends TSelectValue>({ options, value, onChange, placeholder = "Select...", classNames }: TSelectProps<T>) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    const [isOpen, setIsOpen] = useState(false);
    const selectedRef = useRef<HTMLLIElement>(null);

    const handleOptionClick = (value: T) => {
        onChange(value);
        setIsOpen(false);
    };

    // Скроллим к выбранному элементу при открытии
    useEffect(() => {
        if (isOpen && selectedRef.current) {
            selectedRef.current.scrollIntoView({ block: "nearest" });
        }
    }, [isOpen]);

    const selectRef = useClickOutside<HTMLDivElement>(() => {
        setIsOpen(false)
    });

    return (
        <div
        ref={selectRef}
        className={clsx(
        merge("root"),
        "relative",
        )}
        >
            <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
            "hover:cursor-pointer increase_hover_anim select-none",
            "w-full !flex items-center justify-between",
            "caption_regular text-texticon_base_default",
            "py-[1.1vw] pl-[3.3vw] pr-[2.2vw]",
            "bg-surface_secondary border-[0.27vw] border-border_default rounded-[2.2vw]",
            "bp700px:py-[0.57vw] bp700px:pl-[1.71vw] bp700px:pr-[1.14vw] bp700px:border-[0.14vw] bp700px:rounded-[1.14vw]",
            "bp1200px:py-[4px] bp1200px:pl-[12px] bp1200px:pr-[8px] bp1200px:border-[1px] bp1200px:rounded-[8px]"
            )}
            type="button"
            >
                {value !== null ? options.find(item => item.value === value)?.label : placeholder}
                <MicroHalfArrowIcon
                svg_className={clsx(
                "w-[4.4vw] h-[4.4vw]",
                "transition-transform duration-400",
                "bp700px:w-[2.57vw] bp700px:h-[2.57vw]",
                "bp1200px:w-[20px] bp1200px:h-[20px]",
                isOpen ? "rotate-90" : "rotate-270"
                )}
                path_className={clsx(
                "fill-texticon_base_default"
                )}
                />
            </button>

            <AnimatePresence
            mode="sync"
            >
                {isOpen &&
                <motion.ul
                key={isOpen.toString()}
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={clsx(
                "w-full absolute",
                "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
                "mt-[1.1vw] p-[2.2vw]",
                "bp700px:mt-[0.57vw] bp700px:p-[1.14vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
                "bp1200px:mt-[4px] bp1200px:p-[8px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
                )}
                style={{
                    zIndex: Z_INDEX.selectPopup
                }}
                >
                    <ScrollbarWrapper
                    classNames={{
                        root: merge("scrollbarRoot"),
                        wrapper: merge("scrollbarWrapper")
                    }}
                    >
                        {options.map((option) => (
                            <SelectItem
                            key={option.value}
                            option={option}
                            selectedOption={value}
                            handleOptionClick={handleOptionClick}
                            ref={option.value === value ? selectedRef : null}
                            />
                        ))}
                    </ScrollbarWrapper>
                </motion.ul>}
            </AnimatePresence>
        </div>
    )
}

export { Select }

type TSelectClassNames = {
	root?: string;
    scrollbarRoot?: string;
    scrollbarWrapper?: string
};

type TSelectProps<T extends TSelectValue> = {
	options: TSelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    classNames?: TSelectClassNames;
};

const defaultClassNames: Required<TSelectClassNames> = {
	root: "w-[27.7vw] bp700px:w-[21.43vw] bp1200px:w-[200px]",
    scrollbarRoot: "",
    scrollbarWrapper: ""
};