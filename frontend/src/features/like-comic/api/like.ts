import { getApi } from "@/shared/api";

export async function patchComicLike(comic_transliterate_id: string, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/comics/${comic_transliterate_id}/like`, { signal })).data;
}