import { getApi } from "@/shared/api";
import { TComment } from "@/entities/comment/model/types";

export async function putComment(comic_id: string, text: string, parent_comment_id?: string, signal?: AbortSignal) {
    return (await (await getApi()).put<TComment>(`/api/comments?comic_id=${comic_id}&text=${text}${parent_comment_id ? `&parent_comment_id=${parent_comment_id}` : ""}`, { signal })).data;
}