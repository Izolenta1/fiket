import { getQueryClient } from "@/shared/api"
import { getChapter } from "@/entities"
import { notFound } from "next/navigation";
import {
    PageReader,
    generateReaderMetadata
} from "@/views";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export async function generateMetadata({ params }: TReaderParametres) {
    const { comic_transliterate_id, chapter_id } = await params

    try {
        const chapter = await getChapter(chapter_id)
        return generateReaderMetadata(comic_transliterate_id, chapter_id, chapter)
    }
    catch {
        return {}
    }
}

export default async function Reader({ params }: TReaderParametres) {
    const { comic_transliterate_id, chapter_id } = await params

	const queryClient = getQueryClient()

	const chapter_data = await queryClient.fetchQuery({
		queryKey: ["chapter", chapter_id],
		queryFn: () => getChapter(chapter_id)
	})
    .catch((e) => {
        if (e?.status > 400) notFound();
        throw e;
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageReader
            comic_transliterate_id={comic_transliterate_id}
            chapter_id={chapter_id}
            />
        </HydrationBoundary>
    )
}

type TReaderParametres = {
	params: Promise<{ comic_transliterate_id: string, chapter_id: string }>
};