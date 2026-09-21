import {
	PageFilter,
	generateFilterMetadata
} from "@/views";

export const metadata = generateFilterMetadata()

export default async function Filter() {
	return (
		<PageFilter />
	);
}