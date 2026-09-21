export function generateAuthorsMetadata() {
    return {
        title: 'Fiket | Стать автором',
        description: "Присоединяйтесь к Fiket как автор! Публикуйте свои комиксы, находите читателей и развивайте собственное сообщество.",
        alternates: {
            canonical: "https://fiket.ru/authors"
        },
        openGraph: {
            title: "Стать автором",
            description: "Присоединяйтесь к Fiket как автор! Публикуйте свои комиксы, находите читателей и развивайте собственное сообщество.",
            url: "https://fiket.ru/authors",
            type: "article",
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