import {
	PageAgreement,
	generateAgreementMetadata,
	generateAgreementJsonLd
} from "@/views";

export const metadata = generateAgreementMetadata()

export default async function Agreement() {
	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAgreementJsonLd()) }}
			/>

			<PageAgreement />
		</>
	);
}