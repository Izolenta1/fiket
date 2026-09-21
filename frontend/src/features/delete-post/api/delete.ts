import { getApi } from "@/shared/api";

export async function deletePost(post_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/post/${post_id}`, { signal })).data;
}