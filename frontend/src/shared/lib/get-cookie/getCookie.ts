import { getServerCookie } from "./getServerCookie";
import { getClientCookie } from "./getClientCookie";

const isServer = typeof window === "undefined";

export async function getCookie(name: string) {
    return isServer
    ? await getServerCookie(name)
    : getClientCookie(name);
}