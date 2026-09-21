import {
    useModal,
    SlidersIcon
} from "@/shared/ui";
import clsx from "clsx";
import { FilterModal } from "./FilterModal";

const FilterButton = () => {
    const { open, openModal, closeModal } = useModal();

    return (
        <>
            <button
            onClick={openModal}
            className={clsx(
            "cursor-pointer increase_hover_anim",
            )}
            >
                <SlidersIcon
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
            <FilterModal
            open={open}
            onClose={closeModal}
            />
        </>
    )
}

export { FilterButton };