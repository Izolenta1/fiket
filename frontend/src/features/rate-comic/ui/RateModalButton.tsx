import clsx from "clsx"

const RateModalButton = ({ onClick, value, name, selected }: TRateModalButtonProps) => {
    return (
        <button
        onClick={onClick}
        className={clsx(
        "cursor-pointer decrease_hover_anim",
        )}
        >
            <div
            className={clsx(
            "flex items-center gap-[2.7vw]",
            "bg-surface_body rounded-[3.3vw] border-[0.27vw]",
            "caption_regular select-none",
            "transition-all duration-[400ms]",
            "p-[3.3vw] pr-[6.6vw]",
            selected ? "text-texticon_base_accent border-texticon_base_accent" : "text-texticon_base_default border-transparent",
            "bp700px:gap-[1.43vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw] bp700px:p-[1.71vw] bp700px:pr-[3.43vw]",
            "bp1200px:gap-[10px] bp1200px:rounded-[12px] bp1200px:border-[1px] bp1200px:p-[12px] bp1200px:pr-[24px]"
            )}
            >
                <span
                className={clsx(
                "w-[5.5vw] num_regular",
                "bp700px:w-[4.57vw]",
                "bp1200px:w-[32px]"
                )}
                >
                {value}</span>

                {name}
            </div>
        </button>
    )
}

export { RateModalButton }

type TRateModalButtonProps = {
    onClick: () => void,
    value: number,
    name: string,
    selected: boolean
}