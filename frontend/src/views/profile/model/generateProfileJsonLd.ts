import { TUserResponse } from "@/entities/user/model/types"
import { TAuthorMedia } from "@/entities/user/model/types"

export function generateProfileJsonLd(user: TUserResponse) {
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
						"name": user.nickname,
						"item": `https://fiket.ru/profile/${user.username}`
					}
				]
			},
			{
				"@type": "Person",
				"@id": `https://fiket.ru/profile/${user.username}`,
				"name": user.nickname,
				"url": `https://fiket.ru/profile/${user.username}`,
				"image": user.ava_url,
				"description": `Читайте комиксы автора - ${user.nickname} на Fiket.ru. ${user.author?.about === null ? "Описание не указано" : user.author?.about}`,
                "sameAs": collectSocials(user.author?.media_social)
			}
		]
	}
}

function collectSocials(media: TAuthorMedia | undefined): string[] {
    const array: string[] = []

    if (media) {
        if (media.youtube != null) {
            array.push(media.youtube)
        }
        if (media.vk != null) {
            array.push(media.vk)
        }
        if (media.tg != null) {
            array.push(media.tg)
        }
        if (media.pinterest != null) {
            array.push(media.pinterest)
        }
        if (media.dzen != null) {
            array.push(media.dzen)
        }
    }

    return array
}