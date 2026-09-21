import {
    TChaptersResponse,
    TChapterReader
} from "../model/types";
import { getApi } from "@/shared/api";

export async function getFirstChapter(comic_id: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TChaptersResponse>(`/api/chapters?comic_id=${comic_id}&limit=1&offset=0&sort=asc`, { signal })).data;
}

export async function getChapters(comic_id: string, page_param: number, signal?: AbortSignal) {
    return (await (await getApi()).get<TChaptersResponse>(`/api/chapters?comic_id=${comic_id}&limit=10&offset=${page_param}`, { signal })).data;
}

export async function getChapter(chapter_id: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TChapterReader>(`/api/chapters/${chapter_id}`, { signal })).data;
}