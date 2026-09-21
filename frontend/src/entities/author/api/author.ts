import { TAuthorsResponse } from "../model/types";
import { getApi } from "@/shared/api";

export async function getIndexAuthors(signal?: AbortSignal) {
    return (await (await getApi()).get<TAuthorsResponse>(`/api/users/author-list?limit=20&offset=0`, { signal })).data;
}