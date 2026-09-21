import {
    useModal,
    ArrowUpDownIcon
} from "@/shared/ui";
import { SortModal } from "./SortModal";
import clsx from "clsx";

const SortButton = () => {
    const { open, openModal, closeModal } = useModal();

    return (
        <>
            <button
            onClick={openModal}
            className={clsx(
            "cursor-pointer increase_hover_anim",
            )}
            >
                <ArrowUpDownIcon
                svg_className={clsx(
                "w-[6.6vw] h-[6.6vw]",
                "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                "bp1200px:w-[32px] bp1200px:h-[32px]"
                )}
                path_className={clsx(
                "stroke-texticon_base_header"
                )}
                />
            </button>
            <SortModal
            open={open}
            onClose={closeModal}
            />
        </>
    )
}

export { SortButton };