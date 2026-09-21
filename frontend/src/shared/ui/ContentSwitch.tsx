import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";

const ContentSwitch = ({ buttons, selectedContent, setSelectedContent, classNames }: TContentSwitchProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <div 
        className={clsx(
        merge("root"),
        "flex gap-[3.3vw] justify-center items-center",
        "p-[3.3vw]",
        "border-[0.27vw] border-border_default rounded-[3.3vw]",
        "bp700px:py-[2.29vw] bp700px:px-[4.57vw] bp700px:gap-[3.43vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:py-[16px] bp1200px:px-[24px] bp1200px:gap-[32px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
        )}
        >
            {buttons.map(item =>
            <button
            className={clsx(
            merge("buttonWrapper"),
            "hover:cursor-pointer increase_hover_anim select-none",
            )}
            key={item.value}
            onClick={() => setSelectedContent(item.value)}
            >
                <span
                className={clsx(
                merge("button"),
                "block transition-colors duration-[400ms]",
                selectedContent === item.value ? "text-texticon_base_accent caption_bold" : "text-texticon_base_header caption_regular"
                )}>{item.label}</span>
            </button>
            )}
        </div>
    );
};

export { ContentSwitch };

type TContentSwitchClassNames = {
	root?: string;
    buttonWrapper?: string
    button?: string;
};

type TContentSwitchProps = {
    buttons: { label: string, value: string }[],
    selectedContent: string,
    setSelectedContent: React.Dispatch<React.SetStateAction<string>>,
	classNames?: TContentSwitchClassNames;
};

const defaultClassNames: Required<TContentSwitchClassNames> = {
	root: "bg-surface_secondary",
    buttonWrapper: "",
    button: ""
};