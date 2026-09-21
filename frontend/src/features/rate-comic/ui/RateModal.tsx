import { motion, AnimatePresence } from "framer-motion";
import {
    Modal,
    ScrollbarWrapper,
    XmarkIcon,
    StarIcon
} from "@/shared/ui";
import { ratings } from "../model/fixtures";
import { usePersonalRating } from "../model/queries";
import { useUser } from "@/global/providers";
import {
    usePatchRatingMutation,
    useDeleteRatingMutation
} from "../model/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalToast } from '@/global/providers';
import clsx from "clsx";
import { RateModalButton } from "./RateModalButton";
import { TPersonalRatingResponse } from "../model/types";

const RateModal = ({ open, onClose, comic_id }: TRateModalProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()

    const { data: personalRating } = usePersonalRating(Boolean(user), comic_id)

    const queryClient = useQueryClient()
    const {mutate: patchRatingMutate} = usePatchRatingMutation({
        onMutate: async ({ comic_id, rating }) => {
            await queryClient.cancelQueries({ queryKey: ["personal_rating", comic_id] })
            const previousRating = queryClient.getQueryData<TPersonalRatingResponse>(["personal_rating", comic_id])
            queryClient.setQueryData(["personal_rating", comic_id], {rating: rating})

            return { previousRating }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["personal_rating", comic_id] })
        },
        onError: (error, { comic_id }, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для добавления рейтинга необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["personal_rating", comic_id], { rating: context.previousRating })
            }
            else {
                queryClient.setQueryData(["personal_rating", comic_id], { rating: null })
            }
        }
    })

    const {mutate: deleteRatingMutate} = useDeleteRatingMutation({
        onMutate: async ({ comic_id }) => {
            await queryClient.cancelQueries({ queryKey: ["personal_rating", comic_id] })
            const previousRating = queryClient.getQueryData<TPersonalRatingResponse>(["personal_rating", comic_id])
            queryClient.setQueryData(["personal_rating", comic_id], {rating: null})
            
            return { previousRating }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["personal_rating", comic_id] })
        },
        onError: (error, { comic_id }, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для удаления рейтинга необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["personal_rating", comic_id], { rating: context.previousRating })
            }
            else {
                queryClient.setQueryData(["personal_rating", comic_id], { rating: null })
            }
        }
    })

    function toggleRating(comic_id: string, rating: number) {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для добавления рейтинга необходима авторизация." })
            return
        }
        
        if (personalRating?.rating && personalRating?.rating === rating) {
            deleteRatingMutate({ comic_id: comic_id })
        }
        else {
            patchRatingMutate({ comic_id: comic_id, rating: rating })
        }
    }
    
    return (
        <Modal
        open={open}
        onClose={onClose}
        >
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[2.29vw]",
            "bp1200px:gap-[20px]"
            )}
            >
                
                {/* Заголовок */}
                <div
                className={clsx(
                "flex items-center justify-between"
                )}
                >
                    <p
                    className={clsx(
                    "label_l2 text-texticon_base_header select-none"
                    )}
                    >Как вам комикс?</p>

                    <button
                    onClick={onClose}
                    className={clsx(
                    "cursor-pointer increase_hover_anim"
                    )}
                    >
                        <XmarkIcon
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
                </div>

                {/* Текущая оценка */}
                <div
                className={clsx(
                "flex items-center gap-[1.6vw] self-center",
                "review_bold text-texticon_base_header select-none",
                "bp700px:mt-[0.57vw] bp700px:gap-[0.86vw]",
                "bp1200px:mt-[8px] bp1200px:gap-[6px]"
                )}
                >
                    <p>Ваша оценка:</p>

                    <AnimatePresence
                    mode="wait"
                    >
                        <motion.span
                        key={personalRating?.rating ?? "no-rating"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {personalRating?.rating ?? "-"}
                        </motion.span>
                    </AnimatePresence>

                    <StarIcon
                    svg_className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[24px] bp1200px:h-[24px]"
                    )}
                    path_className={clsx(
                    "stroke-texticon_base_header"
                    )}
                    />
                </div>

                {/* Враппер оценок */}
                <ScrollbarWrapper
                classNames={{
                root: "max-h-[69.4vw] bp700px:max-h-[42.86vw] bp1200px:max-h-[350px]",
                wrapper: "gap-[2.2vw] bp700px:gap-[1.14vw] bp1200px:gap-[8px]"
                }}
                >
                    {ratings.map(rating =>
                    <RateModalButton
                    onClick={() => toggleRating(comic_id, rating.value)}
                    key={rating.value}
                    value={rating.value}
                    name={rating.name}
                    selected={rating.value === personalRating?.rating}
                    />
                    )}
                </ScrollbarWrapper>
            </div>
        </Modal>
    )
}

export { RateModal };

type TRateModalProps = {
    open: boolean,
    onClose: () => void;
    comic_id: string
}