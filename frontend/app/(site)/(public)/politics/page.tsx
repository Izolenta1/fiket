import {
	PagePolitics,
	generatePoliticsMetadata,
	generatePoliticsJsonLd
} from "@/views";

export const metadata = generatePoliticsMetadata()

export default async function Politics() {
	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePoliticsJsonLd()) }}
			/>

			<PagePolitics />
		</>
	);
}