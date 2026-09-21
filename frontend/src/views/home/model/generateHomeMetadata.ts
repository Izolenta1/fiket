export function generateHomeMetadata() {
    return {
        title: 'Fiket | Читайте комиксы онлайн',
        description: "Fiket — платформа для чтения и публикации комиксов онлайн. Российские авторы, новые главы, вебтуны, манга, графические новеллы, бесплатно и с эксклюзивным контентом.",
        alternates: {
            canonical: "https://fiket.ru"
        },
        openGraph: {
            title: "Читайте комиксы онлайн",
            description: "Fiket — платформа для чтения и публикации комиксов онлайн. Российские авторы, новые главы, вебтуны, манга, графические новеллы, бесплатно и с эксклюзивным контентом.",
            url: "https://fiket.ru",
            type: "website",
            images: [
                {
                    url: "https://fiket.ru/opengraph/og_default.png",
                    width: 1200,
                    height: 630,
                    alt: "Fiket"
                }
            ],
            siteName: "Fiket",
            locale: "ru_RU"
        }
    }
}