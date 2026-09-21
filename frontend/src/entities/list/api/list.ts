import { getApi } from "@/shared/api";
import { TListResponse } from "../model/types";

export async function getUserList(category_id: string, list_mode: string, pageParam: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TListResponse>(`/api/comic-lists/${category_id}?limit=10&offset=${pageParam}${list_mode ? `&paid_type=${list_mode}` : ""}`, { signal })).data;
}