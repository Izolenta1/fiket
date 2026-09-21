import {
    PageVerify,
    generateVerifyMetadata
} from "@/views";
import { TURLSearchParams } from "@/shared/model";

export const metadata = generateVerifyMetadata()

export default async function Verify({ searchParams }: { searchParams: Promise<TURLSearchParams> }) {
    const params = await searchParams

	return (
        <PageVerify
        token={Array.isArray(params.token) ? params.token[0] : params.token ?? ""}
        />
	);
}