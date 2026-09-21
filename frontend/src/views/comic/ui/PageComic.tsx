'use client'

import {
    FullWidthBanner,
    ComicBannerBlock,
    ComicInfoBlock,
    ComicDescription,
    ComicComments
} from "@/widgets";
import {
    useFullComic,
    ComicChapters,
    AgeRestriction,
    ComicCard,
    useComicSimilar
} from "@/entities";
import dynamic from 'next/dynamic';
export const Ads = dynamic(() => import('@/widgets').then(mod => mod.Ads), { ssr: false });
import { PurchasePlaceholder } from "@/features/buy-comic";
import {
    Carousel,
    CarouselSlide,
    AnimatedMain
} from "@/shared/ui";

const PageComic = ({ comic_transliterate_id, comic_id }: TPageComicProps) => {
    const { data: comic } = useFullComic(comic_transliterate_id)
    const { data: similarComics, isError: isSimilarError } = useComicSimilar(comic_id)
    
    if (comic) {
        return (
            <AnimatedMain>
                <FullWidthBanner
                image_url={comic.banner_url}
                image_alt={comic.name}
                />

                {!comic.age_pass && <AgeRestriction />}

                <ComicBannerBlock comic_transliterate_id={comic_transliterate_id} />
                <ComicInfoBlock comic_transliterate_id={comic_transliterate_id} />
                <Ads />
                <ComicDescription comic_transliterate_id={comic_transliterate_id} />

                <ComicChapters
                comic_transliterate_id={comic_transliterate_id}
                purchasePlaceholder={(!comic.purchased && comic.cost) && <PurchasePlaceholder comic_id={comic.id} cost={comic.cost} />}
                />

                <Carousel
                name="Похожие"
                isLoop={true}
                noDataText={isSimilarError ? "Ошибка сервера :/" : "Похожие не найдены :/"}
                >
                    {similarComics?.answer.map(comic => 
                    <CarouselSlide key={comic.id}>
                        <ComicCard comic={comic} />
                    </CarouselSlide>)}
                </Carousel>

                <ComicComments comic_id={comic.id} />
            </AnimatedMain>
        )
    }
    else {
        return null
    }
}

export { PageComic };

type TPageComicProps = {
    comic_transliterate_id: string
    comic_id: string
}