import { getApi } from "@/shared/api";
import { TUserResponse } from "../model/types";

export async function getUser(username: string, signal?: AbortSignal) {
    return (await (await getApi()).get<TUserResponse>(`/api/users/${username}`, { signal })).data;
}