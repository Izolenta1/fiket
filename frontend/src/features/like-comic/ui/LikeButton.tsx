'use client'

import clsx from "clsx";
import {
    HeartFillIcon,
    HeartIcon,
    GlassBackground
} from "@/shared/ui";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import { motion, AnimatePresence } from "framer-motion";
import { formatNumber } from "@/shared/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useComicLikeMutation } from "../model/mutations";
import { TComicFull } from "@/entities/comic/model/types";
import { produce } from "immer";

const LikeButton = ({ comic_transliterate_id, liked, likes_count }: TLikeButtonProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()

    const queryClient = useQueryClient()
    const {mutate: patchRatingMutate} = useComicLikeMutation({
        onMutate: async ({ comic_transliterate_id, type }) => {
            await queryClient.cancelQueries({ queryKey: ["comic", comic_transliterate_id] })
            const previousComic = queryClient.getQueryData<TComicFull>(["comic", comic_transliterate_id])

            queryClient.setQueryData<TComicFull>(
                ["comic", comic_transliterate_id],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        draft.liked = type === "add";
                        draft.likes_count += type === "add" ? 1 : -1;
                    })
            )

            return { previousComic }
        },
        onError: (error, { comic_transliterate_id }, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для установки лайка необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["comic", comic_transliterate_id], context.previousComic)
            }
        }
    })

    function toggleLike() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для установки лайка необходима авторизация." })
            return
        }

        if (liked) {
            patchRatingMutate({ comic_transliterate_id: comic_transliterate_id, type: "remove" })
        }
        else {
            patchRatingMutate({ comic_transliterate_id: comic_transliterate_id, type: "add" })
        }
    }

    return (
        <>
            <GlassBackground>
                <button
                onClick={toggleLike}
                className={clsx(
                "cursor-pointer increase_hover_anim",
                )}
                >
                    <div
                    className={clsx(
                    "flex items-center gap-[1.1vw]",
                    "select-none",
                    "px-[3.3vw] py-[1.1vw]",
                    "bp700px:px-[1.71vw] bp700px:py-[1.14vw] bp700px:gap-[0.57vw]",
                    "bp1200px:px-[12px] bp1200px:py-[8px] bp1200px:gap-[4px]"
                    )}
                    >
                        <AnimatePresence
                        initial={false}
                        mode="popLayout"
                        >
                            <motion.div
                            key={liked.toString()}
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                {liked
                                ? <HeartFillIcon
                                svg_className={clsx(
                                "w-[4.4vw] h-[4.4vw]",
                                "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                                "bp1200px:w-[16px] bp1200px:h-[16px]"
                                )}
                                path_className={clsx(
                                "fill-texticon_base_accent"
                                )}
                                />
                                : <HeartIcon
                                svg_className={clsx(
                                "w-[4.4vw] h-[4.4vw]",
                                "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                                "bp1200px:w-[16px] bp1200px:h-[16px]"
                                )}
                                path_className={clsx(
                                "stroke-texticon_base_subheader"
                                )}
                                />}
                            </motion.div>
                        </AnimatePresence>

                        <AnimatePresence
                        initial={false}
                        mode="popLayout"
                        >
                            <motion.div
                            key={likes_count}
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className={clsx(
                            "widget_regular",
                            liked ? "text-texticon_base_accent" : "text-texticon_base_subheader"
                            )}
                            >
                                {formatNumber(likes_count)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </button>
            </GlassBackground>
        </>
    )
}

export { LikeButton };

type TLikeButtonProps = {
    comic_transliterate_id: string,
    liked: boolean,
    likes_count: number
}