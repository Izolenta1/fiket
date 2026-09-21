import { getApi } from "@/shared/api";
import { TPaymentResponse } from "../model/types";

export async function postPayment(comic_id: string, signal?: AbortSignal) {
    return (await (await getApi()).post<TPaymentResponse>(`/api/payment`, { comic_id: comic_id }, { headers: { 'Content-Type': 'application/json' }, signal })).data;
}