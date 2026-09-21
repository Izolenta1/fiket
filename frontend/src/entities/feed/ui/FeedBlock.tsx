'use client'

import { motion } from "framer-motion";
import clsx from "clsx";
import { UserRow } from "./UserRow";
import { TPost } from "../model/types";
import { ImagesCarousel } from "./ImagesCarousel";
import { PollBlock } from "./PollBlock";
import { BasementBlock } from "./BasementBlock";
import { useInView } from "react-intersection-observer";
import { usePatchPostViewMutation } from "../model/mutations";
import { useState } from "react";

const FeedBlock = ({ post, username, page_number }: TFeedBlockProps) => {
    const [viewed, setViewed] = useState(false)
    
    const {mutate: patchPostViewMutate} = usePatchPostViewMutation({
        onSuccess() {
            setViewed(true)
        },
        onError: (error) => {
            console.log("Ошибка просмотра поста: " + error.response?.data.error)
        }
    })
    
    const { ref } = useInView({
		threshold: 0.5,
		onChange: (inView) => {
			if (inView && !viewed) {
				patchPostViewMutate({ post_id: post.id})
			}
		},
	})
    
    return (
        <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={clsx(
        "flex flex-col gap-[3.3vw] w-full",
        "p-[3.3vw]",
        "bg-surface_container border-border_default border-[0.27vw] rounded-[3.3vw] overflow-hidden",
        "bp700px:gap-[1.71vw] bp700px:p-[1.71vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:gap-[12px] bp1200px:p-[12px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
        )}
        >
            <UserRow
            username={post.username}
            post_id={post.id}
            page_number={page_number}
            />

            <ImagesCarousel
            images_urls={post.images_urls}
            />

            <p
            className="caption_regular text-texticon_base_default"
            >{post.text}</p>

            {post.poll &&
            <PollBlock
            poll={post.poll}
            username={username}
            page_number={page_number}
            post_id={post.id}
            />}

            <BasementBlock
            username={username}
            post_id={post.id}
            liked={post.liked}
            likes_count={post.likes_count}
            page_number={page_number}
            views_count={post.views_count}
            created_at={post.created_at}
            />
        </motion.div>
    )
}

export { FeedBlock };

type TFeedBlockProps = {
    post: TPost,
    username: string,
    page_number: number
}