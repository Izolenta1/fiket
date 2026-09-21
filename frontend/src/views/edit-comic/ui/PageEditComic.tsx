'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import { ComicEditHeader } from "@/widgets";
import { EditComicForm } from "@/features/profile";

const PageEditComic = ({ username, comic_transliterate_id }: TPageEditComicProps) => {
    const editBreadcrumbs = [
        {id: 1, name: "Мои комиксы", link: `/profile/${username}`},
        {id: 2, name: "Редактировать комикс", link: ""}
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={editBreadcrumbs}
            />

            <ComicEditHeader
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            />

            <EditComicForm
            username={username}
            comic_transliterate_id={comic_transliterate_id}
            />
        </AnimatedMain>
    )
}

export { PageEditComic };

type TPageEditComicProps = {
    username: string;
    comic_transliterate_id: string
}