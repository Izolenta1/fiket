export function generatePoliticsMetadata() {
    return {
        title: 'Fiket | Политика обработки персональных данных',
        description: "Ознакомьтесь с политикой обработки персональных данных на Fiket. Мы заботимся о конфиденциальности и защите ваших данных.",
        alternates: {
            canonical: "https://fiket.ru/politics"
        },
        openGraph: {
            title: "Политика обработки персональных данных",
            description: "Ознакомьтесь с политикой обработки персональных данных на Fiket. Мы заботимся о конфиденциальности и защите ваших данных.",
            url: "https://fiket.ru/politics",
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