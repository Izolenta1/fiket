import clsx from "clsx";

const PollLine = ({ title, sumVotes, votes, isSelected }: TPollLineProps) => {
    const percent = Math.round((votes / sumVotes) * 100)
    
    return (
        <div
        className={clsx(
        "flex flex-col gap-[1.1vw]",
        "bp700px:gap-[0.57vw]",
        "bp1200px:gap-[4px]"
        )}
        >
            <div
            className={clsx(
            "flex caption_regular text-texticon_base_default"
            )}
            >
                <span>{title}</span>
                
                <span
                className={clsx(
                "ml-auto"
                )}
                >{percent}%</span>
            </div>

            {/* Полоса голосов */}
            <div
            className={clsx(
            "w-full h-[1.1vw]",
            "bg-surface_secondary rounded-full",
            "bp700px:h-[0.57vw]",
            "bp1200px:h-[4px]"
            )}
            >
                <div
                className={clsx(
                "h-full",
                "bg-[linear-gradient(91deg,#15C59A_0%,#26BBA5_41%,#31ADB7_68.5%,#17C6BB_100%)] rounded-full",
                isSelected ? "opacity-100" : "opacity-50"
                )}
                style={{
                width: `${percent}%`
                }}
                />
            </div>
        </div>
    )
}

export { PollLine };

type TPollLineProps = {
    title: string;
    sumVotes: number;
    votes: number;
    isSelected: boolean
}