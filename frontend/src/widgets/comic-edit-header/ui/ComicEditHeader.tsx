'use client'

import clsx from "clsx";
import {
    ProfileOptions,
    ProfileDelete,
    useDeleteComicMutation
} from "@/features/profile";
import { useFullComic } from "@/entities";
import { useState } from "react";
import { useGlobalToast } from '@/global/providers';
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ComicEditHeader = ({ username, comic_transliterate_id }: TComicEditHeaderProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()
    const { data: comic } = useFullComic(comic_transliterate_id)

    const queryClient = useQueryClient()
    
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const { mutate: deleteComicMutate, isPending: deleteComicPending } = useDeleteComicMutation({
        onSuccess: () => {
            createToast({ type: "positive", text: "Комикс успешно удален." })
            setDeleteSuccess(true)

            queryClient.removeQueries({ queryKey: ["author_comics", username, "PAID"] })
            queryClient.refetchQueries({ queryKey: ["author_comics", username, "PAID"] })

            queryClient.removeQueries({ queryKey: ["author_comics", username, "FREE"] })
            queryClient.refetchQueries({ queryKey: ["author_comics", username, "FREE"] })

            router.push(`/profile/${username}`)
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для удаления комикса необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: error.response?.data.error ?? "Ошибка удаления." })
            }
        }
    })

    if (comic) {
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
                >Редактирование комикса</h1>

                <ProfileOptions
                title={comic.name}
                >
                    <ProfileDelete
                    title="Удалить комикс"
                    subText="Данное действие необратимо :/"
                    confirmText={comic.name}
                    onDelete={() => deleteComicMutate({
                        comic_id: comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)
                    })}
                    deleteLoading={deleteComicPending || deleteSuccess}
                    />
                </ProfileOptions>
            </div>
        )
    }
    else {
        return null
    }
}

export { ComicEditHeader };

type TComicEditHeaderProps = {
    username: string;
    comic_transliterate_id: string
}