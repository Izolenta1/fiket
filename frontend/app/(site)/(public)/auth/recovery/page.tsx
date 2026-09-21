import {
    PageRecovery,
    generateRecoveryMetadata
} from "@/views";
import { TURLSearchParams } from "@/shared/model";
import { safe } from "@/shared/lib";
import { jwtDecode } from "jwt-decode";
import { TJwtPayload } from "@/shared/model";
import type { InvalidTokenError } from "jwt-decode";
import { notFound } from "next/navigation";
import { isJwtExpired } from "@/shared/lib";

export const metadata = generateRecoveryMetadata()

export default async function Recovery({ searchParams }: { searchParams: Promise<TURLSearchParams> }) {
    const params = await searchParams

    const recoveryToken = Array.isArray(params.token) ? params.token[0] : params.token ?? ""
    const [errorToken, decodedToken] = await safe<TJwtPayload, InvalidTokenError>(() => jwtDecode<TJwtPayload>(recoveryToken));

    if (!decodedToken || errorToken || isJwtExpired(decodedToken)) {
        notFound()
    }

	return (
        <PageRecovery
        nickname={decodedToken.sub.nickname}
        token={recoveryToken}
        />
	);
}