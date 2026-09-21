import { InfiniteData } from "@tanstack/react-query"
import { TPostsResponse } from "@/entities/feed/model/types"

export type TPostDeleteVariables = {
    post_id: string
}

export type TPostDeleteContext = {
    previousPosts?: InfiniteData<TPostsResponse>
}