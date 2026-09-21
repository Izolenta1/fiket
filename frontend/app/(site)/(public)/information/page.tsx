import {
	PageInformation,
	generateInformationMetadata,
	generateInformationJsonLd
} from "@/views";

export const metadata = generateInformationMetadata()

export default async function Information() {
	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generateInformationJsonLd()) }}
			/>

			<PageInformation />
		</>
	);
}