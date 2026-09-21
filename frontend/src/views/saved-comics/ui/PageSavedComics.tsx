'use client'

import {
    AnimatedMain,
    Breadcrumbs,
    ContentSwitch
} from "@/shared/ui";
import { useState } from "react";
import { ProfileSavedComicsBlock } from "@/entities";

const PageSavedComics = ({ username }: TPageSavedComicsProps) => {
    const [selectedContent, setSelectedContent] = useState("")
    
    const savedComicsBreadcrumbs = [
        {id: 1, name: "Аккаунт", link: `/profile/${username}`},
        {id: 2, name: "Сохраненные комиксы", link: ""}
    ]
    
    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={savedComicsBreadcrumbs}
            />

            <ContentSwitch
            buttons={[
            {label: "Все", value: ""},
            {label: "Бесплатные", value: "FREE"},
            {label: "Платные", value: "PAID"}
            ]}
            selectedContent={selectedContent}
            setSelectedContent={setSelectedContent}
            classNames={{
            root: "bg-surface_container w-full bp1200px:w-[500px]"
            }}
            />

            <ProfileSavedComicsBlock
            username={username}
            category_id="00000000-0000-0000-0000-000000000000"
            list_name="Прочитано"
            list_mode={selectedContent}
            />

            <ProfileSavedComicsBlock
            username={username}
            category_id="00000000-0000-0000-0000-000000000001"
            list_name="Читаю"
            list_mode={selectedContent}
            />

            <ProfileSavedComicsBlock
            username={username}
            category_id="00000000-0000-0000-0000-000000000002"
            list_name="Отложено"
            list_mode={selectedContent}
            />

            <ProfileSavedComicsBlock
            username={username}
            category_id="00000000-0000-0000-0000-000000000003"
            list_name="Запланированно"
            list_mode={selectedContent}
            />

            <ProfileSavedComicsBlock
            username={username}
            category_id="00000000-0000-0000-0000-000000000004"
            list_name="Избранное"
            list_mode={selectedContent}
            />
        </AnimatedMain>
    )
}

export { PageSavedComics };

type TPageSavedComicsProps = {
    username: string
}