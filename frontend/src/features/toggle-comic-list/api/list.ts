import { TPersonalListsResponse } from "../model/types";
import { getApi } from "@/shared/api";

export async function getPersonalLists(comic_id: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TPersonalListsResponse>(`/api/comic-lists/where?comic_id=${comic_id}`, { signal })).data;
}

export async function putPersonalList(comic_id: string, category_id: string, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/comic-lists`, {
        "comic_id": comic_id,
        "category_id": category_id
    }, { signal })).data;
}

export async function deletePersonalList(comic_id: string, category_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/comic-lists/${category_id}/${comic_id}`, { signal })).data;
}