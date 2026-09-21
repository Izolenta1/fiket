import { getApi } from "@/shared/api";
import { TSearchData } from "../model/types";

export async function getSearch(search: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TSearchData>(`/api/comics/search?query=${search}`, { signal })).data;
}