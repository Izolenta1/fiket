import { getApi } from "@/shared/api";
import { TPostsResponse } from "../model/types";

export async function getPosts(username: string, pageParam: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TPostsResponse>(`/api/post?username=${username}&limit=10&offset=${pageParam}`, { signal })).data;
}

export async function patchPostView(post_id: string, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/post/${post_id}/read`, { signal })).data;
}