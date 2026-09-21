import {
	PageQuestions,
	generateQuestionsMetadata,
	generateQuestionsJsonLd
} from "@/views";

export const metadata = generateQuestionsMetadata()

export default async function Questions() {
	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generateQuestionsJsonLd()) }}
			/>

			<PageQuestions />
		</>
	);
}