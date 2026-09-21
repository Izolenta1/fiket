'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import { CreateComicForm } from "@/features/profile";
import clsx from "clsx";

const PageNewComic = ({ username }: TPageNewComicProps) => {
    const newComicBreadcrumbs = [
        {id: 1, name: "Комиксы", link: `/profile/${username}`},
        {id: 2, name: "Создать комикс", link: ""}
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={newComicBreadcrumbs}
            />

            <h1
            className={clsx(
            "label_l1 text-texticon_base_header select-none"
            )}
            >Создать комикс</h1>

            <CreateComicForm
            username={username}
            />
        </AnimatedMain>
    )
}

export { PageNewComic };

type TPageNewComicProps = {
    username: string
}