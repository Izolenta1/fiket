import { AnimatePresence, motion } from "framer-motion";
import {
    HeartFillIcon,
    HeartIcon
} from "@/shared/ui";
import { formatNumber } from "@/shared/lib";
import {
    usePutCommentLikeMutation,
    useDeleteCommentLikeMutation
} from "../model/mutations";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import {
    type InfiniteData,
    useQueryClient
} from "@tanstack/react-query";
import { TCommentsResponse } from "@/entities/comment/model/types";
import { produce } from "immer";
import { likeCommentRecursive } from "../lib/likeCommentRecursive";
import clsx from "clsx";

const CommentLike = ({ comic_id, comment_id, page_number, liked, count_likes }: TCommentLikeProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    
    const queryClient = useQueryClient()
    const {mutate: putCommentLikeMutate} = usePutCommentLikeMutation({
        onMutate: async ({ comment_id }) => {
            await queryClient.cancelQueries({ queryKey: ["comments", comic_id] })
            const previousComments = queryClient.getQueryData<InfiniteData<TCommentsResponse>>(["comments", comic_id])

            queryClient.setQueryData<InfiniteData<TCommentsResponse>>(
                ["comments", comic_id],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        const page = draft.pages[page_number]
                        if (!page) return

                        likeCommentRecursive(page.answer, true, comment_id)
                    })
            )

            return { previousComments }
        },
        onError: (error, {}, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для установки лайка необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["comments", comic_id], context.previousComments)
            }
        }
    })

    const {mutate: deleteCommentLikeMutate} = useDeleteCommentLikeMutation({
        onMutate: async ({ comment_id }) => {
            await queryClient.cancelQueries({ queryKey: ["comments", comic_id] })
            const previousComments = queryClient.getQueryData<InfiniteData<TCommentsResponse>>(["comments", comic_id])

            queryClient.setQueryData<InfiniteData<TCommentsResponse>>(
                ["comments", comic_id],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        const page = draft.pages[page_number]
                        if (!page) return

                        likeCommentRecursive(page.answer, false, comment_id)
                    })
            )

            return { previousComments }
        },
        onError: (error, {}, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для снятия лайка необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["comments", comic_id], context.previousComments)
            }
        }
    })

    // Функция тоггла лайка
    function toggleLike() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для установки лайка необходима авторизация." })
            return
        }

        if (!liked) {
            putCommentLikeMutate({ comment_id })
        }
        else {
            deleteCommentLikeMutate({ comment_id })
        }
    }

    return (
        <button
        onClick={toggleLike}
        className={clsx(
        "increase_hover_anim hover:cursor-pointer"
        )}
        >
            <div
            className={clsx(
            "select-none",
            "flex items-center gap-[1.1vw]",
            "bp700px:gap-[0.57vw]",
            "bp1200px:gap-[4px]"
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
                        "w-[3.8vw] h-[3.8vw]",
                        "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                        "bp1200px:w-[24px] bp1200px:h-[24px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_accent"
                        )}
                        />
                        : <HeartIcon
                        svg_className={clsx(
                        "w-[3.8vw] h-[3.8vw]",
                        "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                        "bp1200px:w-[24px] bp1200px:h-[24px]"
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
                    key={count_likes}
                    className={clsx(
                    "caption_regular",
                    liked ? "text-texticon_base_accent" : "text-texticon_base_subheader"
                    )}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {formatNumber(count_likes)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </button>
    )
    
}

export { CommentLike };

type TCommentLikeProps = {
    comic_id: string,
    comment_id: string,
    page_number: number,
    liked: boolean,
    count_likes: number
}