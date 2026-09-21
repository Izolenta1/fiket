import { getApi } from "@/shared/api";

export async function patchProfile(data: FormData, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/users`,
        data, 
        {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            signal
        }
    )).data;
}

export async function deleteProfile(signal?: AbortSignal) {
    return (await (await getApi()).delete(`/api/users`, { signal })).data;
}

