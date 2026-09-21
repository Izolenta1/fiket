import { ToggleSwitch } from "@/shared/ui";
import clsx from "clsx";

const AddListModalToggle = ({ name, isToggled, trueCallback, falseCallback }: TAddListModalToggleProps) => {
    return (
        <div
        className={clsx(
        "flex justify-between items-center",
        "bg-surface_body rounded-[3.3vw]",
        "p-[3.3vw] pr-[6.6vw]",
        "bp700px:rounded-[1.71vw] bp700px:p-[1.71vw] bp700px:pr-[3.43vw]",
        "bp1200px:rounded-[12px] bp1200px:p-[12px] bp1200px:pr-[24px]"
        )}
        >
            <span
            className={clsx(
            "transition-all duration-400",
            "button_regular select-none",
            isToggled ? "text-texticon_base_header !font-[700]" : "text-texticon_base_subheader"
            )}>{name}</span>

            <ToggleSwitch
            isToggled={isToggled}
            trueCallback={trueCallback}
            falseCallback={falseCallback}
            />
        </div>
    )
}

export { AddListModalToggle };

type TAddListModalToggleProps = {
    name: string;
    isToggled: boolean;
    falseCallback?: () => void;
    trueCallback?: () => void;
}