import {
    PageEditChapter,
    generateEditChapterMetadata
} from "@/views";
import { getQueryClient } from "@/shared/api";
import {
    getFullComic,
    getChapter
} from "@/entities";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export const metadata = generateEditChapterMetadata()

export default async function EditChapter({ params }: TEditChapterParametres) {
    const { username, comic_transliterate_id, chapter_id } = await params

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

    const chapter_data = await queryClient.fetchQuery({
        queryKey: ["chapter", chapter_id],
        queryFn: () => getChapter(chapter_id)
    })
    .catch((e) => {
        if (e?.status > 400) notFound();
        throw e;
    });

    return (
        <HydrationBoundary
		state={dehydrate(queryClient)}
		>
            <PageEditChapter
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            chapter_id={chapter_id}
            />
        </HydrationBoundary>
    )
}

type TEditChapterParametres = {
	params: Promise<{ username: string, comic_transliterate_id: string, chapter_id: string }>
};