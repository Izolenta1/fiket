'use client'

import clsx from "clsx";
import {
    ProfileOptions,
    ProfileDelete,
    useDeleteChapterMutation
} from "@/features/profile";
import {
    useFullComic,
    useChapter
} from "@/entities";
import { useState } from "react";
import { useGlobalToast } from '@/global/providers';
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const EditChapterHeader = ({ username, comic_transliterate_id, chapter_id }: TEditChapterHeaderProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()
    
    const { data: comic } = useFullComic(comic_transliterate_id)
    const { data: chapter } = useChapter(chapter_id)

    const queryClient = useQueryClient()
    
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const { mutate: deleteChapterMutate, isPending: deleteChapterPending } = useDeleteChapterMutation({
        onSuccess: () => {
            createToast({ type: "positive", text: "Глава успешно удалена." })
            setDeleteSuccess(true)

            queryClient.removeQueries({ queryKey: ["chapters", comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)] })

            router.push(`/profile/${username}`)
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для удаления главы необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: error.response?.data.error ?? "Ошибка удаления." })
            }
        }
    })

    if (comic && chapter) {
        return (
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[3.43vw]",
            "bp1200px:gap-[24px] bp1200px:grid bp1200px:grid-cols-2"
            )}
            >
                <h1
                className={clsx(
                "label_l1 text-texticon_base_header select-none"
                )}
                >Редактировать главу</h1>

                <ProfileOptions
                title={comic.name}
                subText={`Глава ${chapter.chapter_number} - ${chapter.chapter_name}`}
                >
                    <ProfileDelete
                    title="Удалить главу"
                    subText="Данное действие необратимо :/"
                    confirmText={chapter.chapter_name}
                    onDelete={() => deleteChapterMutate({
                        chapter_id
                    })}
                    deleteLoading={deleteChapterPending || deleteSuccess}
                    />
                </ProfileOptions>
            </div>
        )
    }
    else {
        return null
    }
}

export { EditChapterHeader };

type TEditChapterHeaderProps = {
    username: string;
    comic_transliterate_id: string;
    chapter_id: string
}