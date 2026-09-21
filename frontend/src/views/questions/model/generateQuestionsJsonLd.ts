export function generateQuestionsJsonLd() {
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
						"name": "Вопросы и ответы",
						"item": `https://fiket.ru/questions`
					}
				]
			},
			{
				"@type": "FAQPage",
				"@id": `https://fiket.ru/questions`,
				"name": "Вопросы и ответы",
				"url": `https://fiket.ru/questions`,
				"description": "Ответы на популярные вопросы о платформе Fiket: чтение, публикация комиксов, аккаунт, подписки и многое другое.",
                "isPartOf": { "@id": "https://fiket.ru" },
				"inLanguage": "ru",
			}
		]
	}
}