import clsx from "clsx";
import { InputInline } from "@/shared/ui";

const Row = ({ name, placeholder, value, onChange }: TRowProps) => {
    return (
        <div
        className={clsx(
        "flex gap-[3.3vw] items-center",
        "bp700px:gap-[1.71vw]",
        "bp1200px:gap-[12px]"
        )}
        >
            <div
            className={clsx(
            "px-[4.4vw] py-[2.2vw]",
            "w-[33.3vw] flex justify-center items-center",
            "bg-surface_body rounded-[3.3vw]",
            "caption_bold text-texticon_base_header select-none",
            "bp700px:px-[2.29vw] bp700px:py-[1.14vw] bp700px:w-[17.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:px-[16px] bp1200px:py-[8px] bp1200px:w-[120px] bp1200px:rounded-[12px]"
            )}
            >{name}</div>

            <InputInline
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            />
        </div>
    );
};

export { Row };

type TRowProps = {
    name: string,
    placeholder: string,
    value: string,
    onChange: (value: string) => void
}