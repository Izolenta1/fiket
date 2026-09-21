import Cookies from "js-cookie";

export function getClientCookie(name: string): string | undefined {
    return Cookies.get(name);
}