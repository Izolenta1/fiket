import { getApi } from "@/shared/api";

export async function putPostLike(post_id: string, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/post/${post_id}/like`, { signal })).data;
}

export async function deletePostLike(post_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/post/${post_id}/like`, { signal })).data;
}