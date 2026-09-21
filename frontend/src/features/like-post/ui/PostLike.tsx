import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import { HeartFillIcon } from "@/shared/ui";
import { formatNumber } from "@/shared/lib";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import {
    useQueryClient,
    type InfiniteData
} from "@tanstack/react-query";
import {
    usePutPostLikeMutation,
    useDeletePostLikeMutation
} from "../model/mutations";
import { TPostsResponse } from "@/entities/feed/model/types";
import { produce } from "immer";

const PostLike = ({ username, post_id, liked, likes_count, page_number }: TPostLikeProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    
    const queryClient = useQueryClient()
    const {mutate: putPostLikeMutate} = usePutPostLikeMutation({
        onMutate: async ({ post_id }) => {
            await queryClient.cancelQueries({ queryKey: ["posts", username] })
            const previousPosts = queryClient.getQueryData<InfiniteData<TPostsResponse>>(["posts", username])

            queryClient.setQueryData<InfiniteData<TPostsResponse>>(
                ["posts", username],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        const page = draft.pages[page_number]
                        if (!page) return

                        for (const post of page.answer) {
                            if (post.id === post_id) {
                                post.liked = true
                                post.likes_count += 1
                            }
                        }
                    })
            )

            return { previousPosts }
        },
        onError: (error, {}, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для установки лайка необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["posts", username], context.previousPosts)
            }
        }
    })

    const {mutate: deletePostLikeMutate} = useDeletePostLikeMutation({
        onMutate: async ({ post_id }) => {
            await queryClient.cancelQueries({ queryKey: ["posts", username] })
            const previousPosts = queryClient.getQueryData<InfiniteData<TPostsResponse>>(["posts", username])

            queryClient.setQueryData<InfiniteData<TPostsResponse>>(
                ["posts", username],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        const page = draft.pages[page_number]
                        if (!page) return

                        for (const post of page.answer) {
                            if (post.id === post_id) {
                                post.liked = false
                                post.likes_count -= 1
                            }
                        }
                    })
            )

            return { previousPosts }
        },
        onError: (error, {}, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для снятия лайка необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["posts", username], context.previousPosts)
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
            putPostLikeMutate({ post_id })
        }
        else {
            deletePostLikeMutate({ post_id })
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
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[24px] bp1200px:h-[24px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_accent"
                        )}
                        />
                        : <HeartFillIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[24px] bp1200px:h-[24px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_unactive"
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
                    className={clsx(
                    liked ? "text-texticon_base_accent" : "text-texticon_base_unactive"
                    )}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {formatNumber(likes_count)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </button>
    )
    
}

export { PostLike };

type TPostLikeProps = {
    username: string,
    post_id: string,
    liked: boolean,
    likes_count: number,
    page_number: number
}