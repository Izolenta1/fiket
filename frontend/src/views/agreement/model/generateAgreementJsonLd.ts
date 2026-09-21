export function generateAgreementJsonLd() {
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
						"name": "Пользовательское соглашение",
						"item": `https://fiket.ru/agreement`
					}
				]
			},
			{
				"@type": "WebPage",
				"@id": `https://fiket.ru/agreement`,
				"name": "Пользовательское соглашение",
				"url": `https://fiket.ru/agreement`,
				"description": "Условия использования сайта Fiket. Ознакомьтесь с правилами доступа, публикации и использования контента.",
                "isPartOf": { "@id": "https://fiket.ru" },
				"inLanguage": "ru",
			}
		]
	}
}