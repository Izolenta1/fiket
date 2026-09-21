import { createServerApi } from "./serverInstance";
import { createClientApi } from "./clientInstance";
import { getCookie } from "@/shared/lib";

const isServer = typeof window === "undefined";

export async function getApi() {
    const accessToken = (await getCookie("access_token"))?.replaceAll('"', " ")

    return isServer
    ? createServerApi({ baseURL: process.env.BACKEND_SERVER_URI, accessToken: accessToken })
    : createClientApi({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URI, accessToken: accessToken });
}