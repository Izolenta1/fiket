import {
	PageAuth,
	generateAuthMetadata
} from "@/views";

export const metadata = generateAuthMetadata()

export default async function Auth() {
	return (
        <PageAuth />
	);
}