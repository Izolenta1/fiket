import { TComicFull } from "@/entities/comic/model/types"

export function generateComicJsonLd(comic_transliterate_id: string, comic: TComicFull) {
    return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": "https://fiket.ru",
				"url": "https://fiket.ru",
				"name": "Fiket",
				"description": "Fiket — платформа для чтения и публикации комиксов онлайн. Российские авторы, новые главы, вебтуны, манга, графические новеллы, бесплатно и с эксклюзивным контентом.",
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Главная",
						"item": "https://fiket.ru"
					},
					{
						"@type": "ListItem",
						"position": 2,
						"name": comic.name,
						"item": `https://fiket.ru/comic/${comic_transliterate_id}`
					}
				]
			},
			{
				"@type": "ComicSeries",
				"@id": `https://fiket.ru/comic/${comic_transliterate_id}`,
				"name": comic.name,
				"url": `https://fiket.ru/comic/${comic_transliterate_id}`,
				"image": comic.poster_url,
				"description": `Читайте комикс от автора ${comic.author.nickname}. ${comic.description === null ? "Описание не указано" : comic.description}`,
				"author": {
					"@type": "Person",
					"name": comic.author.nickname,
					"url": `https://fiket.ru/profile/${comic.author.username}`
				},
				"genre": comic.genres.length > 0 ? comic.genres.map(genre => genre.name) : ["Жанры не указаны"],
				"keywords": `веб-комикс, ${comic.genres.map(genre => genre.name).join(", ")}, читать онлайн`,
				"inLanguage": "ru",
			}
		]
	}
}