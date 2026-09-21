'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import { ProfileEditForm } from "@/features/profile";
import { useProfileContext } from "@/views";
import { ProfileEditHeader } from "@/widgets";

const PageProfileEdit = ({ username }: TPageProfileEditProps) => {
    const { profileCondition } = useProfileContext()
    
    const editBreadcrumbs = [
        {id: 1, name: "Аккаунт", link: `/profile/${username}`},
        {id: 2, name: "Редактирование", link: ""}
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={editBreadcrumbs}
            />

            <ProfileEditHeader
            username={username}
            />

            <ProfileEditForm
            profileCondition={profileCondition}
            username={username}
            />
        </AnimatedMain>
    )
}

export { PageProfileEdit };

type TPageProfileEditProps = {
    username: string
}