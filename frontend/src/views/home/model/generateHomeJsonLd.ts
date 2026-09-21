export function generateHomeJsonLd() {
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
					}
				]
			}
		]
	}
}