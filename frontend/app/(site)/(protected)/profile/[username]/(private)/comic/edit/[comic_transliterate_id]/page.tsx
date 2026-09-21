import {
    PageEditComic,
    generateEditComicMetadata
} from "@/views";
import { getQueryClient } from "@/shared/api";
import { getFullComic } from "@/entities";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export const metadata = generateEditComicMetadata()

export default async function EditComic({ params }: TEditComicParametres) {
    const { username, comic_transliterate_id } = await params

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

    return (
        <HydrationBoundary
		state={dehydrate(queryClient)}
		>
            <PageEditComic
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            />
        </HydrationBoundary>
    )
}

type TEditComicParametres = {
	params: Promise<{ username: string, comic_transliterate_id: string }>
};