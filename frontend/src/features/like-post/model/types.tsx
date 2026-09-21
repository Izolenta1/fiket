import { InfiniteData } from "@tanstack/react-query"
import { TPostsResponse } from "@/entities/feed/model/types"

export type TPostLikeVariables = {
    post_id: string
}

export type TPostLikeContext = {
    previousPosts?: InfiniteData<TPostsResponse>
}