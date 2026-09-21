import { FillEyeIcon } from "@/shared/ui";
import {
    formatFullDate,
    formatNumber
} from "@/shared/lib";
import clsx from "clsx";
import { PostLike } from "@/features/like-post";

const BasementBlock = ({ username, post_id, liked, likes_count, page_number, views_count, created_at }: TBasementBlockProps) => {
    return (
        <div
        className={clsx(
        "flex items-center",
        "caption_regular text-texticon_base_unactive select-none"
        )}
        >
            <PostLike
            username={username}
            post_id={post_id}
            liked={liked}
            likes_count={likes_count}
            page_number={page_number}
            />

            <div
            className={clsx(
            "ml-auto",
            "flex gap-[1.1vw] items-center",
            "bp700px:gap-[0.57vw]",
            "bp1200px:gap-[4px]"
            )}
            >
                <FillEyeIcon
                svg_className={clsx(
                "w-[4.4vw] h-[4.4vw]",
                "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                "bp1200px:w-[24px] bp1200px:h-[24px]"
                )}
                path_className={clsx(
                "fill-texticon_base_unactive"
                )}
                />

                {formatNumber(views_count)}
            </div>

            <div
            className={clsx(
            "ml-[2.7vw]",
            "flex items-center",
            "bp700px:ml-[1.43vw]",
            "bp1200px:ml-[10px]"
            )}
            >{formatFullDate(created_at)}</div>
        </div>
    )
}

export { BasementBlock };

type TBasementBlockProps = {
    username: string,
    post_id: string,
    liked: boolean,
    likes_count: number,
    page_number: number
    views_count: number,
    created_at: string
}