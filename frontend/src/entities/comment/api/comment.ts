import { getApi } from "@/shared/api";
import { TCommentsResponse } from "../model/types";

export async function getComments(comic_id: string, pageParam: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TCommentsResponse>(`/api/comments?comic_id=${comic_id}&limit=10&offset=${pageParam}`, { signal })).data;
}