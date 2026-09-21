'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui"
import { CreatePostForm } from "@/features/profile"
import clsx from "clsx"

const PageCreatePost = ({ username }: TPageCreatePostProps) => {
    const editBreadcrumbs = [
        {id: 1, name: "Лента", link: `/profile/${username}`},
        {id: 2, name: "Создать пост", link: ""}
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={editBreadcrumbs}
            />

            <h1
            className={clsx(
            "label_l1 text-texticon_base_header select-none"
            )}
            >Создать пост</h1>

            <CreatePostForm
            username={username}
            />
        </AnimatedMain>
    )
}

export { PageCreatePost };

type TPageCreatePostProps = {
    username: string
}