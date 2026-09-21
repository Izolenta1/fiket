import { forwardRef } from "react"
import clsx from "clsx"
import { TSelectOption } from "../model"
import { TSelectValue } from "../model"

const SelectItem = forwardRef(
    <T extends TSelectValue>(
        { option, selectedOption, handleOptionClick }: TSelectItemProps<T>,
        ref: React.Ref<HTMLLIElement>
    ) => {
        return (
            <li
            ref={ref}
            onClick={() => handleOptionClick(option.value)}
            className={clsx(
            "transition-color duration-400 hover:cursor-pointer decrease_hover_anim select-none",
            "p-[1.1vw] last:mb-[0.27vw]",
            "caption_regular text-texticon_base_default",
            "border-[0.27vw] rounded-[2.2vw]",
            "bp700px:p-[0.57vw] bp700px:border-[0.14vw] bp700px:rounded-[1.14vw] bp700px:last:mb-[0.14vw]",
            "bp1200px:p-[4px] bp1200px:border-[1px] bp1200px:rounded-[8px] bp1200px:last:mb-[1px]",
            selectedOption === option.value ? "border-texticon_base_accent bg-surface_body" : "border-transparent bg-transparent"
            )}
            >{option.label}</li>
        );
    }
) as <
    T extends TSelectValue
>(
    props: TSelectItemProps<T> & { ref?: React.Ref<HTMLLIElement> }
) => React.ReactElement | null;

export { SelectItem }

type TSelectItemProps<T extends TSelectValue> = {
	option: TSelectOption<T>;
    selectedOption: T;
    handleOptionClick: (value: T) => void;
};