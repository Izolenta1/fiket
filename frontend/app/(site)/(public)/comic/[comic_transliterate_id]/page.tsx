import { getQueryClient } from "@/shared/api";
import {
    getComicSimilar,
    getFullComic,
	getFirstChapter,
	getChapters
} from "@/entities";
import { getPersonalRating } from "@/features/rate-comic";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import {
	PageComic,
	generateComicMetadata,
	generateComicJsonLd
} from "@/views";

export async function generateMetadata({ params }: TComicPageParametres) {
	const { comic_transliterate_id } = await params

	try {
		const comic = await getFullComic(comic_transliterate_id)
		return generateComicMetadata(comic_transliterate_id, comic)
	}
	catch {
		return {}
	}
}

export default async function Comic({ params }: TComicPageParametres) {
    const { comic_transliterate_id } = await params
	const comic_id = comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)
	
	const queryClient = getQueryClient()

	// fetchQuery вместо prefetchQuery для мгновенного доступа к данным (в том числе и ошибке)
	const comic_data = await queryClient.fetchQuery({
		queryKey: ["comic", comic_transliterate_id],
		queryFn: () => getFullComic(comic_transliterate_id)
	})
	.catch((e) => {
		if (e?.status > 400) notFound();
		throw e;
	});

	await queryClient.prefetchQuery({
		queryKey: ["personal_rating", comic_id],
		queryFn: () => getPersonalRating(comic_id)
	})

	await queryClient.prefetchQuery({
		queryKey: ["first_chapter", comic_id],
		queryFn: () => getFirstChapter(comic_id)
	})

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["chapters", comic_id],
		queryFn: ({ pageParam = 0 }) => getChapters(comic_id, pageParam),
		initialPageParam: 0,
	})

	await queryClient.prefetchQuery({
		queryKey: ["similar", comic_id],
		queryFn: () => getComicSimilar(comic_id)
	})

	return (
		<>
			<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(generateComicJsonLd(comic_transliterate_id, comic_data)) }}
			/>

			<HydrationBoundary
			state={dehydrate(queryClient)}
			>
				<PageComic comic_transliterate_id={comic_transliterate_id} comic_id={comic_id} />
			</HydrationBoundary>
		</>
	);
}

type TComicPageParametres = {
	params: Promise<{ comic_transliterate_id: string }>
};