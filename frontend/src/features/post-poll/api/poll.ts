import { getApi } from "@/shared/api";

export async function putPostVariant(variant_id: string, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/variant/${variant_id}`, { signal })).data;
}