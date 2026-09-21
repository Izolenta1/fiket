export function generateInformationMetadata() {
    return {
        title: 'Fiket | Информация',
        description: "Узнайте больше о Fiket — платформе для чтения, публикации и продвижения веб-комиксов. Наша миссия — поддерживать авторов и вдохновлять читателей.",
        alternates: {
            canonical: "https://fiket.ru/information"
        },
        openGraph: {
            title: "Информация",
            description: "Узнайте больше о Fiket — платформе для чтения, публикации и продвижения веб-комиксов. Наша миссия — поддерживать авторов и вдохновлять читателей.",
            url: "https://fiket.ru/information",
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