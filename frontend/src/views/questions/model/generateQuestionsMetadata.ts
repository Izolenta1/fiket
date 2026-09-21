export function generateQuestionsMetadata() {
    return {
        title: 'Fiket | Вопросы и ответы',
        description: "Ответы на популярные вопросы о платформе Fiket: чтение, публикация комиксов, аккаунт, подписки и многое другое.",
        alternates: {
            canonical: "https://fiket.ru/questions"
        },
        openGraph: {
            title: "Вопросы и ответы",
            description: "Ответы на популярные вопросы о платформе Fiket: чтение, публикация комиксов, аккаунт, подписки и многое другое.",
            url: "https://fiket.ru/questions",
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