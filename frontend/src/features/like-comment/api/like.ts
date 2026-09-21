import { getApi } from "@/shared/api";

export async function putCommentLike(comment_id: string, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/comments/${comment_id}/like`, { signal })).data;
}

export async function deleteCommentLike(comment_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/comments/${comment_id}/like`, { signal })).data;
}