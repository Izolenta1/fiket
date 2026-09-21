import { jwtDecode } from "jwt-decode";
import { TJwtPayload } from "../model";
import { safe } from "./safeFunction";
import type { InvalidTokenError } from "jwt-decode";

export async function getUserFromToken(accessToken: string | undefined): Promise<{ id: string, username: string } | null> {

    // Декодирование access_token
    if (accessToken) {
        const [errorToken, decodedToken] = await safe<TJwtPayload, InvalidTokenError>(() => jwtDecode<TJwtPayload>(accessToken));

        // Возврат полного авторизованного значения
        if (decodedToken) {
            return {
                id: decodedToken.sub.id,
                username: decodedToken.sub.username
            }
        }

        // Возврат неавторизованного значения, если токен поврежден
        if (errorToken) {
            return null
        }
    }
    
    // Возврат неавторизованного значения
    return null
}