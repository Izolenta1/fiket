import Image from "next/image";
import clsx from "clsx";

const AccountButton = ({ title, subText, onClick, additionalImage, disabledText, wide = false }: TAccountButtonProps) => {
    return (
        <button
        onClick={onClick}
        disabled={Boolean(disabledText)}
        className={clsx(
        wide && "col-span-full",
        !Boolean(disabledText) && "increase_hover_anim hover:cursor-pointer"
        )}
        >
            <div
            className={clsx(
            "select-none",
            "relative flex justify-between h-[33.3vw]",
            "p-[3.3vw]",
            "bg-surface_container border-[0.27vw] border-border_default rounded-[3.3vw] overflow-hidden",
            "bp700px:h-[22.86vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:h-[180px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
            )}
            >
                {/* Текста */}
                <div
                className={clsx(
                "flex flex-col items-start justify-between"
                )}
                >
                    <h2
                    className={clsx(
                    "label_l3 text-texticon_base_header"
                    )}
                    >{title}</h2>

                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_default"
                    )}
                    >{subText}</span>
                </div>

                {/* Дополнительная картинка */}
                <div
                className={clsx(
                "flex justify-center items-center"
                )}
                >
                    {additionalImage &&
                    <Image
                    src={additionalImage}
                    alt={"profile_additional"}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className={clsx(
                    "h-full w-auto",
                    "bp700px:w-[14.29vw] bp700px:h-auto",
                    "bp1200px:h-full bp1200px:w-auto"
                    )}
                    />}
                </div>

                {disabledText &&
                <div
                className={clsx(
                "absolute inset-0 bg-surface_body opacity-90",
                "flex justify-center items-center",
                "label_l1 text-texticon_base_header"
                )}
                >{disabledText}</div>}
            </div>
        </button>
    )
}

export { AccountButton };

type TAccountButtonProps = {
    title: string;
    subText: string;
    onClick: () => void;
    additionalImage?: string;
    disabledText?: string;
    wide?: boolean
}