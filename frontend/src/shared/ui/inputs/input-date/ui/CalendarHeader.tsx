import clsx from "clsx";
import { MicroHalfArrowIcon } from "@/shared/ui/icons";
import { Select } from "@/shared/ui";
import {
MONTHS,
YEARS,
MIN_YEAR,
MAX_YEAR } from "../model/consts";

const CalendarHeader = ({ date, changeYear, changeMonth, decreaseMonth, increaseMonth }: CalendarHeaderProps) => {
    const isPrevDisabled = date.getFullYear() === MIN_YEAR && date.getMonth() === 0;
    const isNextDisabled = date.getFullYear() === MAX_YEAR && date.getMonth() === 11;

    const safeDecreaseMonth = () => {
        if (!isPrevDisabled) decreaseMonth();
    };
    const safeIncreaseMonth = () => {
        if (!isNextDisabled) increaseMonth();
    };
    
    return (
        <div
        className={clsx(
        "border-b border-texticon_base_unactive",
        "flex items-center justify-center gap-[3.3vw]",
        "p-[3.3vw]",
        "bp700px:p-[1.71vw] bp700px:gap-[1.71vw]",
        "bp1200px:p-[12px] bp1200px:gap-[12px]"
        )}
        >
                                
            {/* Кнопка назад */}
            <button
            onClick={safeDecreaseMonth}
            disabled={isPrevDisabled}
            className={clsx(
            "hover:cursor-pointer increase_hover_anim select-none"
            )}
            >
                <MicroHalfArrowIcon
                svg_className={clsx(
                "w-[4.4vw] h-[4.4vw]",
                "bp700px:w-[2.86vw] bp700px:h-[2.86vw]",
                "bp1200px:w-[24px] bp1200px:h-[24px]"
                )}
                path_className={clsx(
                "fill-texticon_base_default"
                )}
                />
            </button>

            <div
            className={clsx(
            "flex gap-[2.2vw]",
            "bp700px:gap-[1.14vw]",
            "bp1200px:gap-[8px]"
            )}
            >

                {/* Select выбора месяца */}
                <Select
                value={date.getMonth()}
                onChange={changeMonth}
                options={MONTHS.map((month, idx) => ({
                    value: idx,
                    label: month
                }))}
                classNames={{
                    root: "w-[27.7vw] bp700px:w-[21.43vw] bp1200px:w-[150px]",
                    scrollbarRoot: "max-h-[55.5vw] bp700px:max-h-[35.71vw] bp1200px:max-h-[250px]"
                }}
                />

                {/* Select выбора года */}
                <Select
                value={date.getFullYear()}
                onChange={changeYear}
                options={YEARS.map((year) => ({
                    value: year,
                    label: year.toString()
                }))}
                classNames={{
                    root: "w-[22.2vw] bp700px:w-[14.29vw] bp1200px:w-[120px]",
                    scrollbarRoot: "max-h-[55.5vw] bp700px:max-h-[35.71vw] bp1200px:max-h-[250px]"
                }}
                />
            </div>

            {/* Кнопка вперёд */}
            <button
            onClick={safeIncreaseMonth}
            disabled={isNextDisabled}
            className={clsx(
            "hover:cursor-pointer increase_hover_anim select-none"
            )}
            >
                <MicroHalfArrowIcon
                svg_className={clsx(
                "rotate-180",
                "w-[4.4vw] h-[4.4vw]",
                "bp700px:w-[2.86vw] bp700px:h-[2.86vw]",
                "bp1200px:w-[24px] bp1200px:h-[24px]"
                )}
                path_className={clsx(
                "fill-texticon_base_default"
                )}
                />
            </button>
        </div>
    )
}

export { CalendarHeader };

type CalendarHeaderProps = {
	date: Date,
    changeYear: (year: number) => void,
    changeMonth: (month: number) => void,
    decreaseMonth: VoidFunction,
    increaseMonth: VoidFunction,
};