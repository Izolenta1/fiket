import { 
    usePosts,
    FeedBlock
} from "@/entities";
import clsx from "clsx";
import { useProfileContext } from "@/views";
import Link from "next/link";
import {
    PlusIcon,
    NoDataPlug,
    LoadingBlock
} from "@/shared/ui";
import { AnimatePresence } from "framer-motion";

const ProfileFeedContent = ({ username }: TProfileFeedContentProps) => {
    const { profileCondition } = useProfileContext()
    const { data: posts, ref: postsLoadingRef, hasNextPage: isPostsNext, isLoading: isPostsLoading, enabled: isPostsEnabled } = usePosts(username)
    
	const renderFeed = () => {
        if (posts) {
            if (posts.pages[0].answer.length <= 0) {
                return <NoDataPlug text="Постов нет :/" />
            }
            
			return posts.pages.map((group, i) => (
                group.answer.map((post) => (
                    <FeedBlock
                    key={post.id}
                    post={post}
                    username={username}
                    page_number={i}
                    />
                ))
			))
		}
	}

    return (
        <div
        className={clsx(
        "flex flex-col items-center gap-[3.3vw]",
        "-mt-[2.2vw]",
        "bp700px:gap-[3.43vw] bp700px:-mt-[2.86vw]",
        "bp1200px:gap-[24px] bp1200px:-mt-[20px]"
        )}
        >
			{profileCondition === "ME AUTHOR" &&
            <Link
            href={`/profile/${username}/create-post`}
            className={clsx(
            "increase_hover_anim w-full",
            "bp1200px:w-[500px]"
            )}
            >
                <div
                className={clsx(
                "flex justify-center items-center gap-[3.3vw]",
                "p-[3.3vw]",
                "bg-surface_container border-border_default border-[0.27vw] rounded-[3.3vw] overflow-hidden",
                "bp700px:gap-[1.71vw] bp700px:p-[1.71vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
                "bp1200px:gap-[12px] bp1200px:p-[16px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
                )}
                >
                    <PlusIcon
                    svg_className={clsx(
                    "w-[4.4vw] h-[4.4vw]",
                    "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                    "bp1200px:w-[24px] bp1200px:h-[24px]"
                    )}
                    path_className={clsx(
                    "stroke-texticon_base_header"
                    )}
                    />

                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_header select-none"
                    )}
                    >Новый пост</span>
                </div>
            </Link>}

			<AnimatePresence>
            	{renderFeed()}
			</AnimatePresence>

            <div
            ref={postsLoadingRef}
            className={clsx(
            (!isPostsEnabled || isPostsNext || isPostsLoading) ? "" : "hidden"
            )}
            >
                <LoadingBlock />
            </div>
        </div>
    )
}

export { ProfileFeedContent };

type TProfileFeedContentProps = {
    username: string
}