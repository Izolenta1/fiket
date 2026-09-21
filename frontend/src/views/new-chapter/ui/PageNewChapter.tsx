'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import { NewChapterHeader } from "@/widgets";
import { NewChapterForm } from "@/features/profile";

const PageNewChapter = ({ username, comic_transliterate_id }: TPageNewChapterProps) => {
    const newChapterBreadcrumbs = [
        {id: 1, name: "Мои комиксы", link: `/profile/${username}`},
        {id: 2, name: "Добавить главу", link: ""}
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={newChapterBreadcrumbs}
            />

            <NewChapterHeader
            comic_transliterate_id={comic_transliterate_id}
            />

            <NewChapterForm
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            />
        </AnimatedMain>
    )
}

export { PageNewChapter };

type TPageNewChapterProps = {
    username: string;
    comic_transliterate_id: string
}