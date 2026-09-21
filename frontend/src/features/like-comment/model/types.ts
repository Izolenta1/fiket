import { InfiniteData } from "@tanstack/react-query"
import { TCommentsResponse } from "@/entities/comment/model/types"

export type TCommentLikeVariables = {
    comment_id: string
}

export type TCommentLikeContext = {
    previousComments?: InfiniteData<TCommentsResponse>
}