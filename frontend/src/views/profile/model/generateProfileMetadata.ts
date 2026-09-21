import { TUserResponse } from "@/entities/user/model/types"

export function generateProfileMetadata(user: TUserResponse) {
    if (user.author == null) {
        return {
            title: `Fiket | Профиль пользователя - ${user.nickname}`,
            description: `Профиль пользователя - ${user.nickname}.`,
            alternates: {
                canonical: `https://fiket.ru/profile/${user.username}`
            },
            robots: "noindex nofollow"
        }
    }

    return {
        title: `Fiket | Профиль автора - ${user.nickname}`,
        description: `Читайте комиксы автора - ${user.nickname} на Fiket.ru.`,
        alternates: {
            canonical: `https://fiket.ru/profile/${user.username}`
        },
        openGraph: {
            title: `Профиль автора - ${user.nickname}`,
            description: `Читайте комиксы автора - ${user.nickname} на Fiket.ru.`,
            url: `https://fiket.ru/profile/${user.username}`,
            type: "profile",
            siteName: "Fiket",
            locale: "ru_RU",
            profile: {
                username: user.nickname,
            }
        }
    }
}