import {
	PageAuthors,
	generateAuthorsMetadata,
	generateAuthorsJsonLd
} from "@/views";

export const metadata = generateAuthorsMetadata()

export default async function Authors() {
	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAuthorsJsonLd()) }}
			/>

			<PageAuthors />
		</>
	);
}