import { getApi } from "@/shared/api";
import { TGenresResponse } from "../model/types";

export async function getGenres(signal?: AbortSignal) {
    return (await (await getApi()).get<TGenresResponse>(`/api/genres`, { signal })).data;
}