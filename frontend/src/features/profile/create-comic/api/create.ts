import { getApi } from "@/shared/api";

export async function putComic(data: FormData, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/comics`,
        data, 
        {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            signal
        }
    )).data;
}