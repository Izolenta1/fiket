import { getApi } from "@/shared/api";
import { TPublisherResponse } from "../model/types";

export async function getPublishers(signal?: AbortSignal) {
    return (await (await getApi()).get<TPublisherResponse>(`/api/publishers`, { signal })).data;
}