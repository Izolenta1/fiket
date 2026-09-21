import {
    TFilterResponse,
    TSimilarResponse,
    TComicFull
} from "../model/types";
import { getApi } from "@/shared/api";

export async function getNovaComics(signal?: AbortSignal) {
    return (await (await getApi()).get<TFilterResponse>(`/api/comics/filter?limit=10&offset=0&date_sort=desc`, { signal })).data;
}

export async function getPopularComics(signal?: AbortSignal) {
    return (await (await getApi()).get<TFilterResponse>(`/api/comics/filter?limit=5&offset=0&views_sort=desc`, { signal })).data;
}

export async function getComicsByGenre(genre_id: string, signal?: AbortSignal) {
	return (await (await getApi()).get<TFilterResponse>(`/api/comics/filter?limit=10&offset=0&rating_sort=desc&genres_id=${genre_id}`, { signal })).data;
}

export async function getFullComic(comic_transliterate_id: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TComicFull>(`/api/comics/${comic_transliterate_id}`, { signal })).data;
}

export async function getComicSimilar(comic_id: string, signal?: AbortSignal) {
	return (await (await getApi()).get<TSimilarResponse>(`/api/comics/similarity?limit=10&offset=0&comic_id=${comic_id}`, { signal })).data;
}

export async function getFilter(params: string, pageParam: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TFilterResponse>(`/api/comics/filter?${params}&offset=${pageParam}`, { signal })).data;
}

export async function getAuthorComics(username: string, paid_type: string, pageParam: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TFilterResponse>(`/api/comics/filter?limit=10&offset=${pageParam}&author_username=${username}&paid_type=${paid_type}`, { signal })).data;
}