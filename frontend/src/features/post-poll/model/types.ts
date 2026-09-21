import { InfiniteData } from "@tanstack/react-query"
import { TPostsResponse } from "@/entities/feed/model/types"

export type TPostVariantVariables = {
    variant_id: string
}

export type TPostVariantContext = {
    previousPosts?: InfiniteData<TPostsResponse>
}