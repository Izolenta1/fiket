import { TJwtPayload } from "../model";

export function isJwtExpired(payload: TJwtPayload): boolean {
	if (!payload.exp) return true;
	return payload.exp * 1000 < Date.now();
}