import clsx from "clsx";

const CalendarDayNames = () => {
    return (
        <div
        className={clsx(
        "flex justify-between",
        "px-[3.3vw]",
        "bp700px:px-[2.29vw]",
        "bp1200px:px-[24px]"
        )}
        >
            {["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map(day => (
            <span
            key={day}
            className={clsx(
            "select-none",
            "w-[6.6vw] h-[6.6vw] block",
            "flex items-center justify-center",
            "caption_regular text-texticon_base_default",
            "bp700px:w-[4.29vw] bp700px:h-[4.29vw]",
            "bp1200px:w-[36px] bp1200px:h-[36px]"
            )}
            >
                {day}
            </span>
            ))}
        </div>
    )
}

export { CalendarDayNames };