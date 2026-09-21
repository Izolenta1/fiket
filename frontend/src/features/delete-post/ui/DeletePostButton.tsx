import { useState } from "react"
import {
    AnimatePresence,
    motion
} from "framer-motion"
import clsx from "clsx"
import {
    ThreeDotIcon,
    XmarkIcon,
    GlassBackground
} from "@/shared/ui"
import { useDeletePostMutation } from "../model/mutations"
import {
    useQueryClient,
    type InfiniteData
} from "@tanstack/react-query"
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import { TPostsResponse } from "@/entities/feed/model/types";
import { produce } from "immer";
import { Z_INDEX } from "@/shared/config"

const DeletePostButton = ({ username, post_id, page_number }: TDeletePostButtonProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()

    const [deleteShow, setDeleteShow] = useState(false)
    
    const queryClient = useQueryClient()
    const {mutate: deletePostMutate} = useDeletePostMutation({
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

                        page.answer = page.answer.filter(post => post.id !== post_id)
                    })
            )

            return { previousPosts }
        },
        onError: (error, {}, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для удаления поста необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["posts", username], context.previousPosts)
            }
        }
    })

    function deletePost() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для удаления поста необходима авторизация." })
            return
        }

        deletePostMutate({ post_id })
    }

    return (
        <>
            <button
            onClick={() => setDeleteShow(!deleteShow)}
            className={clsx(
            "ml-auto increase_hover_anim hover:cursor-pointer"
            )}
            >
                <ThreeDotIcon
                svg_className={clsx(
                "w-[5.5vw] h-[5.5vw]",
                "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                "bp1200px:w-[24px] bp1200px:h-[24px]"
                )}
                path_className={clsx(
                "stroke-texticon_base_default"
                )}
                />
            </button>
                
            <AnimatePresence>
                <motion.div
                key={deleteShow.toString()}
                initial={{ y: -15, scale: 0 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: -15, scale: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={clsx(
                "absolute top-[8.8vw] right-0",
                "bp700px:top-[4.57vw]",
                "bp1200px:top-[32px]"
                )}
                style={{
                zIndex: Z_INDEX.feedDelete
                }}
                >
                    {deleteShow &&
                    <GlassBackground
                    classNames={{
                    root: "increase_hover_anim",
                    background: "rounded-[3.3vw] bp700px:rounded-[1.71vw] bp1200px:rounded-[12px]"
                    }}
                    >
                        <button
                        onClick={deletePost}
                        className={clsx(
                        "hover:cursor-pointer",
                        "flex gap-[2.7vw] items-center",
                        "p-[3.3vw]",
                        "bp700px:gap-[1.43vw] bp700px:p-[1.71vw]",
                        "bp1200px:gap-[10px] bp1200px:p-[12px]"
                        )}
                        >
                            <XmarkIcon
                            svg_className={clsx(
                            "w-[4.4vw] h-[4.4vw]",
                            "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                            "bp1200px:w-[16px] bp1200px:h-[16px]"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_default"
                            )}
                            />

                            <span
                            className={clsx(
                            "button_regular text-texticon_base_default"
                            )}
                            >Удалить пост</span>
                        </button>
                    </GlassBackground>}
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export { DeletePostButton };

type TDeletePostButtonProps = {
    username: string,
    post_id: string,
    page_number: number
}