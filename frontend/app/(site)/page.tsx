import {
	PageHome,
	generateHomeMetadata,
	generateHomeJsonLd
} from "@/views";
import { getQueryClient } from "@/shared/api";
import {
	getComicsByGenre,
	getNovaComics,
	getPopularComics,
	getIndexAuthors
} from "@/entities";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export const metadata = generateHomeMetadata()

export default async function Home() {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["nova"],
		queryFn: () => getNovaComics()
	})

	await queryClient.prefetchQuery({
		queryKey: ["popular"],
		queryFn: () => getPopularComics()
	})

	await queryClient.prefetchQuery({
		queryKey: ["home", "authors"],
		queryFn: () => getIndexAuthors()
	})

	// Романтика
	await queryClient.prefetchQuery({
		queryKey: ["genre", "a0102699-7290-4329-8e82-4da04d592410"],
		queryFn: () => getComicsByGenre("a0102699-7290-4329-8e82-4da04d592410")
	})

	// Фэнтези
	await queryClient.prefetchQuery({
		queryKey: ["genre", "57f98257-453b-42f4-999b-36e5afbd43f4"],
		queryFn: () => getComicsByGenre("57f98257-453b-42f4-999b-36e5afbd43f4")
	})

	// Драма
	await queryClient.prefetchQuery({
		queryKey: ["genre", "5fdaaed8-bc94-4a79-876b-987a52feb0c0"],
		queryFn: () => getComicsByGenre("5fdaaed8-bc94-4a79-876b-987a52feb0c0")
	})

	// Повседневность
	await queryClient.prefetchQuery({
		queryKey: ["genre", "ad8bbb66-61c2-404d-bac5-7ddfe8100d44"],
		queryFn: () => getComicsByGenre("ad8bbb66-61c2-404d-bac5-7ddfe8100d44")
	})

	// Детектив
	await queryClient.prefetchQuery({
		queryKey: ["genre", "19faa528-42ec-4644-bd07-b535c338b7e1"],
		queryFn: () => getComicsByGenre("19faa528-42ec-4644-bd07-b535c338b7e1")
	})

	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHomeJsonLd()) }}
			/>
			
			<HydrationBoundary
			state={dehydrate(queryClient)}
			>
				<PageHome />
			</HydrationBoundary>
		</>
	);
}
