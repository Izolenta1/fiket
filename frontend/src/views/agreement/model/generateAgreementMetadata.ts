export function generateAgreementMetadata() {
    return {
        title: 'Fiket | Пользовательское соглашение',
        description: "Условия использования сайта Fiket. Ознакомьтесь с правилами доступа, публикации и использования контента.",
        alternates: {
            canonical: "https://fiket.ru/agreement"
        },
        openGraph: {
            title: "Пользовательское соглашение",
            description: "Условия использования сайта Fiket. Ознакомьтесь с правилами доступа, публикации и использования контента.",
            url: "https://fiket.ru/agreement",
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