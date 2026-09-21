import {
	PageSearch,
	generateSearchMetadata
} from "@/views";

export const metadata = generateSearchMetadata()

export default async function Search() {
	return (
		<PageSearch />
	);
}