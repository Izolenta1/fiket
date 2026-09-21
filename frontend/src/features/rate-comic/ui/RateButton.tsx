'use client'

import clsx from "clsx";
import {
    StarIcon,
    GlassBackground
} from "@/shared/ui";
import { RateModal } from "./RateModal";
import { useModal } from "@/shared/ui";
import { useUser } from "@/global/providers";
import { useGlobalToast } from '@/global/providers';

const RateButton = ({ comic_id }: TRateButtonProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    const { open, openModal, closeModal } = useModal();

    function openRateModal() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для добавления рейтинга необходима авторизация." })
            return
        }

        openModal()
    }

    return (
        <>
            <GlassBackground>
                <button
                onClick={openRateModal}
                className={clsx(
                "cursor-pointer increase_hover_anim",
                )}
                >
                    <div
                    className={clsx(
                    "flex items-center gap-[1.1vw]",
                    "widget_regular text-texticon_base_header select-none",
                    "px-[6.6vw] py-[1.1vw]",
                    "bp700px:px-[3.43vw] bp700px:py-[1.14vw] bp700px:gap-[0.57vw]",
                    "bp1200px:px-[24px] bp1200px:py-[8px] bp1200px:gap-[4px]"
                    )}
                    >
                        <StarIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_header"
                        )}
                        />
                        <span>Оценить</span>
                    </div>
                </button>
            </GlassBackground>
            <RateModal
            open={open}
            onClose={closeModal}
            comic_id={comic_id}
            />
        </>
    )
}

export { RateButton };

type TRateButtonProps = {
    comic_id: string
}