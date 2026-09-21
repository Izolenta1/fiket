'use client'

import { useState } from "react";
import { DatePicker, registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { CustomDateButton } from "./CustomDateButton";
import { CalendarDayNames } from "./CalendarDayNames";
import { CalendarHeader } from "./CalendarHeader";
import { MotionCalendarContainer } from "./MotionCalendarContainer";
import { AnimatePresence } from 'framer-motion'
import { useClickOutside } from "@/shared/lib";
import { Z_INDEX } from "@/shared/config";
import { formatDate } from "@/shared/lib";

registerLocale("ru", ru);

const InputDate = ({ value, onChange, error }: TInputDateProps) => {
    const [open, setOpen] = useState(false);

    const handleChange = (date: Date | null) => {
        onChange(formatDate(date));
        setOpen(false);
    };

    const inputRef = useClickOutside<HTMLDivElement>(() => {
        setOpen(false)
    });
    
    return (
        <div
        ref={inputRef}
        className={clsx(
        "w-full relative"
        )}
        >
            <CustomDateButton
            value={value ? format(value, "dd.MM.yyyy", { locale: ru }) : ""}
            placeholder="Дата рождения"
            onClick={() => setOpen(prev => !prev)}
            error={error}
            />

            {/* Popup календаря под input */}
            <div
            className={clsx(
            "absolute left-0 top-full w-full",
            "pt-[1.1vw]",
            "bp700px:pt-[0.57vw]",
            "bp1200px:pt-[4px]"
            )}
            style={{
                zIndex: Z_INDEX.calendarPopup
            }}
            >
                <AnimatePresence>
                    {open &&
                    <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={handleChange}
                    open={open}
                    shouldCloseOnSelect={false}
                    disabledKeyboardNavigation={true}
                    locale="ru"
                    inline={true}
                    calendarContainer={MotionCalendarContainer}

                    calendarClassName={clsx(
                    "!overflow-hidden",
                    "my-datepicker w-full !rounded-[3.3vw]",
                    "bp700px:!rounded-[1.71vw]",
                    "bp1200px:!rounded-[12px]"
                    )}
                    dayClassName={() =>
                        clsx(
                        "transition-colors duration-400 increase_hover_anim",
                        "!flex justify-center items-center",
                        "!w-[6.6vw] !h-[6.6vw]",
                        "!m-0",
                        "caption_regular",
                        "bp700px:!w-[4.29vw] bp700px:!h-[4.29vw]",
                        "bp1200px:!w-[36px] bp1200px:!h-[36px]"
                        )
                    }

                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                    }) => (
                        <div
                        className={clsx(
                        "flex flex-col gap-[3.3vw]",
                        "bp700px:gap-[1.71vw]",
                        "bp1200px:gap-[12px]"
                        )}
                        >
                            <CalendarHeader
                            date={date}
                            changeYear={changeYear}
                            changeMonth={changeMonth}
                            decreaseMonth={decreaseMonth}
                            increaseMonth={increaseMonth}
                            />
                            <CalendarDayNames />
                        </div>
                    )}
                    />
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export { InputDate };

type TInputDateProps = {
    value: string,
    onChange: (date: string | null) => void,
    error?: string
}