import { useCopyToClipboard } from "../lib/useCopyToClipboard";
import { ClickToast } from "@/shared/ui";
import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";

const CopyToClipboard = ({ text, classNames }: TCopyToClipboardProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);
    const { copy, toast } = useCopyToClipboard();

    return (
        <div
        className={clsx(
        "relative"
        )}
        >
            <span
            onClick={() => copy(text)}
            className={clsx(
            "hover:cursor-pointer select-none increase_hover_anim w-fit",
            merge("root")
            )}
            >{text}</span>

            <AnimatePresence>
                {toast && 
                <ClickToast
                toast={toast}
                classNames={{
                    root: "-top-[11.1vw] left-0 bp700px:-top-[5.71vw] bp1200px:-top-[60px]"
                }}
                />}
            </AnimatePresence>
        </div>
    )
}

export { CopyToClipboard };

type TCopyToClipboardClassNames = {
	root?: string;
};

type TCopyToClipboardProps = {
	text: string;
    classNames?: TCopyToClipboardClassNames;
};

const defaultClassNames: Required<TCopyToClipboardClassNames> = {
	root: "b-top-[60px] left-0",
};