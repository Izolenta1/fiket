import { ToggleSwitch } from "./ToggleSwitch";
import clsx from "clsx";

const ModalToggle = ({ name, condition, trueCallback, falseCallback }: TModalToggleProps) => {
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
            "transition-all duration-[400ms]",
            "button_regular select-none",
            condition ? "text-texticon_base_header !font-[700]" : "text-texticon_base_subheader"
            )}
            >{name}</span>

			<ToggleSwitch
            isToggled={condition}
            trueCallback={trueCallback}
            falseCallback={falseCallback}
            />
		</div>
    )
}

export { ModalToggle };

type TModalToggleProps = {
	name: string;
    condition: boolean;
	falseCallback?: () => void;
	trueCallback?: () => void;
}