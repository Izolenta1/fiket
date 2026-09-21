export function generatePoliticsJsonLd() {
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
						"name": "Политика обработки персональных данных",
						"item": `https://fiket.ru/politics`
					}
				]
			},
			{
				"@type": "WebPage",
				"@id": `https://fiket.ru/politics`,
				"name": "Политика обработки персональных данных",
				"url": `https://fiket.ru/politics`,
				"description": "Ознакомьтесь с политикой обработки персональных данных на Fiket. Мы заботимся о конфиденциальности и защите ваших данных.",
                "isPartOf": { "@id": "https://fiket.ru" },
				"inLanguage": "ru",
			}
		]
	}
}