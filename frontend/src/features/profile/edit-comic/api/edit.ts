import { getApi } from "@/shared/api";

export async function patchComic(comic_id: string, data: FormData, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/comics/${comic_id}`,
        data, 
        {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            signal
        }
    )).data;
}

export async function deleteComic(comic_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/comics/${comic_id}`, { signal })).data;
}