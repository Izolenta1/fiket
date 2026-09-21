import {
    useModal,
    PlusIcon
} from "@/shared/ui";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import clsx from "clsx";
import { AddListModal } from "./AddListModal";

const AddListButton = ({ comic_id }: TAddListButtonProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    const { open, openModal, closeModal } = useModal();

    function openAddListModal() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для добавления в список необходима авторизация." })
            return
        }

        openModal()
    }

    return (
        <>
            <button
            onClick={openAddListModal}
            className={clsx(
            "hover:cursor-pointer select-none increase_hover_anim",
            "flex! flex-1 gap-[1.1vw] justify-center items-center max-w-[44.4vw]",
            "bg-surface_body border-[0.27vw] rounded-[3.3vw] border-texticon_base_accent",
            "px-[2.7vw] py-[2.2vw]",
            "button_regular text-texticon_base_accent",
            "bp700px:max-w-[38.57vw] bp700px:gap-[0.57vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw] bp700px:px-[1.43vw] bp700px:py-[1.14vw]",
            "bp1200px:max-w-[270px] bp1200px:px-[10px] bp1200px:py-[12px] bp1200px:rounded-[12px] bp1200px:gap-[4px] bp1200px:border-[1px]"
            )}
            >
                <PlusIcon
                svg_className={clsx(
                "w-[4.4vw] h-[4.4vw]",
                "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                "bp1200px:w-[16px] bp1200px:h-[16px]"
                )}
                path_className={(
                "stroke-texticon_base_accent"
                )}
                />

                <span>Добавить в список</span>
            </button>
            <AddListModal
            open={open}
            onClose={closeModal}
            comic_id={comic_id}
            />
        </>
    )
}

export { AddListButton };

type TAddListButtonProps = {
    comic_id: string
}