import clsx from "clsx";

const DotLoadingBlock = () => {
	return (
		<div
        className={clsx(
        "flex gap-[1.1vw]",
        "bp700px:gap-[1.14vw]",
        "bp1200px:gap-[8px]"
        )}
        >
			<span
            className={clsx(
            "w-[2.2vw] h-[2.2vw]",
            "bg-texticon_base_default rounded-full",
            "animate-bounce [animation-delay:0s]",
            "bp700px:w-[1.43vw] bp700px:h-[1.43vw]",
            "bp1200px:w-[12px] bp1200px:h-[12px]"
            )}
            />

			<span
            className={clsx(
            "w-[2.2vw] h-[2.2vw]",
            "bg-texticon_base_default rounded-full",
            "animate-bounce [animation-delay:0.15s]",
            "bp700px:w-[1.43vw] bp700px:h-[1.43vw]",
            "bp1200px:w-[12px] bp1200px:h-[12px]"
            )}
            />

			<span
            className={clsx(
            "w-[2.2vw] h-[2.2vw]",
            "bg-texticon_base_default rounded-full",
            "animate-bounce [animation-delay:0.3s]",
            "bp700px:w-[1.43vw] bp700px:h-[1.43vw]",
            "bp1200px:w-[12px] bp1200px:h-[12px]"
            )}
            />
		</div>
	);
}

export { DotLoadingBlock }