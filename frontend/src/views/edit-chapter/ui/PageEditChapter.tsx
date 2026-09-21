'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import { EditChapterHeader } from "@/widgets";
import { EditChapterForm } from "@/features/profile";

const PageEditChapter = ({ username, comic_transliterate_id, chapter_id }: TPageEditChapterProps) => {
    const editChapterBreadcrumbs = [
        {id: 1, name: "Мои комиксы", link: `/profile/${username}`},
        {id: 2, name: "Редактировать главу", link: ""}
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={editChapterBreadcrumbs}
            />

            <EditChapterHeader
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            chapter_id={chapter_id}
            />

            <EditChapterForm
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            chapter_id={chapter_id}
            />
        </AnimatedMain>
    )
}

export { PageEditChapter };

type TPageEditChapterProps = {
    username: string;
    comic_transliterate_id: string;
    chapter_id: string
}