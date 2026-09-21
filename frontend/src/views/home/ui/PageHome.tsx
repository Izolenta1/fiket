'use client'

import {
    Carousel,
    CarouselSlide,
    Button,
    AnimatedMain
} from "@/shared/ui";
import {
    useComicsByGenre,
    useNovaComics,
    usePopularComics,
    useIndexAuthors,
    ComicCard,
    AuthorCard,
    WideComicCard
} from "@/entities";
export const Ads = dynamic(() => import('@/widgets').then(mod => mod.Ads), { ssr: false });
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const PageHome = () => {
    const router = useRouter();

    const { data: novaComics, isError: isNovaError } = useNovaComics()
    const { data: popularComics, isError: isPopularError } = usePopularComics()
    const { data: authors, isError: isAuthorsError } = useIndexAuthors()
    const { data: romanticComics, isError: isRomanticError } = useComicsByGenre("a0102699-7290-4329-8e82-4da04d592410")
    const { data: fantasyComics, isError: isFantasyError } = useComicsByGenre("57f98257-453b-42f4-999b-36e5afbd43f4")
    const { data: dramaComics, isError: isDramaError } = useComicsByGenre("5fdaaed8-bc94-4a79-876b-987a52feb0c0")
    const { data: dailyComics, isError: isDailyError } = useComicsByGenre("ad8bbb66-61c2-404d-bac5-7ddfe8100d44")
    const { data: detectiveComics, isError: isDetectiveError } = useComicsByGenre("19faa528-42ec-4644-bd07-b535c338b7e1")

    return (
        <AnimatedMain>
            <Ads />

			<Carousel
            name="Новинки"
            isLoop={true}
            noDataText={isNovaError ? "Ошибка сервера :/" : "Новинки не найдены :/"}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&date_sort=desc")}
                />
            }
            >
                {novaComics?.answer.map(comic => 
                <CarouselSlide key={comic.id}>
                    <ComicCard comic={comic} />
                </CarouselSlide>)}
            </Carousel>

			<Carousel
            name="Популярные"
            isLoop={true}
            noDataText={isPopularError ? "Ошибка сервера :/" : "Популярные не найдены :/"}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&views_sort=desc")}
                />
            }
            >
                {popularComics?.answer.map(comic => 
                <CarouselSlide
                key={comic.id}
                classNames={{
                    wrapper: "w-fit bp700px:w-fit bp1200px:w-fit"
                }}
                >
                    <WideComicCard comic={comic} />
                </CarouselSlide>)}
            </Carousel>

            <Carousel
            name="Авторы"
            isLoop={true}
            noDataText={isAuthorsError ? "Ошибка сервера :/" : 'Авторы не найдены :/'}
            >
                {authors?.answer.map(author => 
                <CarouselSlide key={author.id}>
                    <AuthorCard author={author}/>
                </CarouselSlide>)}
            </Carousel>

            <Carousel
            name="Романтика"
            isLoop={true}
            noDataText={isRomanticError ? "Ошибка сервера :/" : 'Комиксы жанра "Романтика" не найдены :/'}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&offset=0&rating_sort=desc&genres_id=a0102699-7290-4329-8e82-4da04d592410")}
                />
            }
            >
                {romanticComics?.answer.map(comic => 
                <CarouselSlide key={comic.id}>
                    <ComicCard comic={comic}/>
                </CarouselSlide>)}
            </Carousel>

            <Ads />

            <Carousel
            name="Фэнтези"
            isLoop={true}
            noDataText={isFantasyError ? "Ошибка сервера :/" : 'Комиксы жанра "Фэнтези" не найдены :/'}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&offset=0&rating_sort=desc&genres_id=57f98257-453b-42f4-999b-36e5afbd43f4")}
                />
            }
            >
                {fantasyComics?.answer.map(comic => 
                <CarouselSlide key={comic.id}>
                    <ComicCard comic={comic}/>
                </CarouselSlide>)}
            </Carousel>

            <Carousel
            name="Драма"
            isLoop={true}
            noDataText={isDramaError ? "Ошибка сервера :/" : 'Комиксы жанра "Драма" не найдены :/'}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&offset=0&rating_sort=desc&genres_id=5fdaaed8-bc94-4a79-876b-987a52feb0c0")}
                />
            }
            >
                {dramaComics?.answer.map(comic => 
                <CarouselSlide key={comic.id}>
                    <ComicCard comic={comic}/>
                </CarouselSlide>)}
            </Carousel>

            <Carousel
            name="Повседневность"
            isLoop={true}
            noDataText={isDailyError ? "Ошибка сервера :/" : 'Комиксы жанра "Повседневность" не найдены :/'}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&offset=0&rating_sort=desc&genres_id=ad8bbb66-61c2-404d-bac5-7ddfe8100d44")}
                />
            }
            >
                {dailyComics?.answer.map(comic => 
                <CarouselSlide key={comic.id}>
                    <ComicCard comic={comic}/>
                </CarouselSlide>)}
            </Carousel>

            <Carousel
            name="Детектив"
            isLoop={true}
            noDataText={isDetectiveError ? "Ошибка сервера :/" : 'Комиксы жанра "Детектив" не найдены :/'}
            additionalBtn={
                <Button
                text="Все"
                variant="carousel"
                onClick={() => router.push("/filter?limit=20&offset=0&rating_sort=desc&genres_id=19faa528-42ec-4644-bd07-b535c338b7e1")}
                />
            }
            >
                {detectiveComics?.answer.map(comic => 
                <CarouselSlide key={comic.id}>
                    <ComicCard comic={comic}/>
                </CarouselSlide>)}
            </Carousel>
		</AnimatedMain>
    );
};

export { PageHome };