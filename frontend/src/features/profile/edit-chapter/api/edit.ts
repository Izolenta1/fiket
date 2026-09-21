import { getApi } from "@/shared/api";

export async function patchChapter(chapter_id: string, data: FormData, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/chapters/${chapter_id}`,
        data, 
        {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            signal
        }
    )).data;
}

export async function deleteChapter(chapter_id: string, signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/chapters/${chapter_id}`, { signal })).data;
}