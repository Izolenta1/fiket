import { TPersonalRatingResponse } from "../model/types";
import { getApi } from "@/shared/api";

export async function getPersonalRating(comic_id: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TPersonalRatingResponse>(`/api/ratings?comic_id=${comic_id}`, { signal })).data;
}

export async function patchPersonalRating(comic_id: string, rating: number, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/ratings?comic_id=${comic_id}&rating=${rating}`, { signal })).data;
}

export async function deletePersonalRating(comic_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/ratings?comic_id=${comic_id}`, { signal })).data;
}