export function generateAuthorsJsonLd() {
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
						"name": "Стать автором",
						"item": `https://fiket.ru/authors`
					}
				]
			},
			{
				"@type": "WebPage",
				"@id": `https://fiket.ru/authors`,
				"name": "Стать автором",
				"url": `https://fiket.ru/authors`,
				"description": "Присоединяйтесь к Fiket как автор! Публикуйте свои комиксы, находите читателей и развивайте собственное сообщество.",
                "isPartOf": { "@id": "https://fiket.ru" },
				"inLanguage": "ru",
			}
		]
	}
}