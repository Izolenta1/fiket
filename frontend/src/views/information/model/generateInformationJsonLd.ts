export function generateInformationJsonLd() {
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
						"name": "Информация",
						"item": `https://fiket.ru/information`
					}
				]
			},
			{
				"@type": "AboutPage",
				"@id": `https://fiket.ru/information`,
				"name": "Информация",
				"url": `https://fiket.ru/information`,
				"description": "Узнайте больше о Fiket — платформе для чтения, публикации и продвижения веб-комиксов. Наша миссия — поддерживать авторов и вдохновлять читателей.",
                "isPartOf": { "@id": "https://fiket.ru" },
				"inLanguage": "ru",
                "mainEntity": {
                    "@type": "WebSite",
                    "@id": "https://fiket.ru",
                },
			}
		]
	}
}