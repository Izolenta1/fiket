import clsx from "clsx";
import { usePutPostVariantMutation } from "../model/mutations";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import {
    useQueryClient,
    type InfiniteData
} from "@tanstack/react-query";
import { TPostsResponse } from "@/entities/feed/model/types";
import { produce } from "immer";

const PollButton = ({ variant_id, title, username, page_number, post_id }: TPollButtonProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    
    const queryClient = useQueryClient()
    const {mutate: putPostVariantMutate} = usePutPostVariantMutation({
        onMutate: async ({ variant_id }) => {
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
                                for (const choice of post.poll.choices) {
                                    if (choice.id === variant_id) {
                                        choice.choice_count += 1
                                        choice.chosen = true
                                    }
                                }
                            }
                        }
                    })
            )

            return { previousPosts }
        },
        onError: (error, {}, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для голосования в опросе необходима авторизация." })
            }

            if (context !== undefined) {
                queryClient.setQueryData(["posts", username], context.previousPosts)
            }
        }
    })

    function voteInPoll() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для голосования в опросе необходима авторизация." })
            return
        }

        putPostVariantMutate({ variant_id })
    }
    
    return (
        <button
        onClick={voteInPoll}
        className={clsx(
        "decrease_hover_anim hover:cursor-pointer",
        "bp1200px:w-fit"
        )}
        >
            <div
            className={clsx(
            "flex justify-start",
            "px-[4.4vw] py-[2.2vw]",
            "border-[0.27vw] border-texticon_base_default rounded-[3.3vw] bg-surface_body",
            "bp700px:px-[2.29vw] bp700px:py-[1.14vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:w-[520px] bp1200px:px-[16px] bp1200px:py-[12px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
            )}
            >
                <span
                className={clsx(
                "button_regular text-texticon_base_default"
                )}
                >{title}</span>
            </div>
        </button>
    )
}

export { PollButton };

type TPollButtonProps = {
    variant_id: string;
    title: string;
    username: string;
    page_number: number
    post_id: string
}