import { TComicFull } from "@/entities/comic/model/types"

export function generateComicMetadata(comic_transliterate_id: string, comic: TComicFull) {
    return {
        title: `Fiket | Комикс ${comic.name} читать онлайн`,
        description: `Читайте комикс от автора ${comic.author.nickname}. ${comic.description === null ? "Описание не указано" : comic.description}`,
        alternates: {
            canonical: `https://fiket.ru/comic/${comic_transliterate_id}`
        },
        openGraph: {
            title: `Комикс ${comic.name} читать онлайн`,
            description: `Читайте комикс от автора ${comic.author.nickname}. ${comic.description === null ? "Описание не указано" : comic.description}`,
            url: `https://fiket.ru/comic/${comic_transliterate_id}`,
            type: "article",
            siteName: "Fiket",
            locale: "ru_RU",
            authors: [`https://fiket.ru/profile/${comic.author.username}`],
            tags: comic.genres.length > 0 ? comic.genres.map(genre => genre.name) : ["веб-комикс"],
        }
    }
}