import { getApi } from "@/shared/api";
import { TPageResponse } from "../model/types";

export async function getPage(chapter_id: string, page_param: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TPageResponse>(`/api/page?chapter_id=${chapter_id}&page_number=${page_param}`, { signal })).data;
}