import { getApi } from "@/shared/api";

export async function putChapter(data: FormData, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/chapters`,
        data, 
        {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            signal
        }
    )).data;
}