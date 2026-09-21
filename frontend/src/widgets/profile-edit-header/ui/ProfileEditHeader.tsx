'use client'

import {
    ProfileOptions,
    ProfileDelete,
    useDeleteProfileMutation
} from "@/features/profile";
import clsx from "clsx";
import { useGlobalToast } from '@/global/providers';
import { useLogoutMutation } from "@/features/auth";
import { useState } from "react";

const ProfileEditHeader = ({ username }: TProfileEditHeaderProps) => {
    const { createToast } = useGlobalToast()
    
    const {mutate: postLogoutMutate, isPending: isPostLogoutPending} = useLogoutMutation({
        onSuccess: () => {
            window.location.replace('/')
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для выхода из аккаунта необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: "Ошибка выхода из аккаунта." })
            }
        }
    })

    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const { mutate: deleteProfileMutate, isPending: deleteProfilePending } = useDeleteProfileMutation({
        onSuccess: () => {
            createToast({ type: "positive", text: "Аккаунт успешно удален." })
            setDeleteSuccess(true)
            postLogoutMutate()
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для удаления аккаунта необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: error.response?.data.error ?? "Ошибка удаления." })
            }
        }
    })
    
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
            >Редактирование профиля</h1>

            <ProfileOptions
            title={username}
            >
                <ProfileDelete
                title="Удалить аккаунт"
                subText="Данное действие необратимо :/"
                confirmText={username}
                onDelete={() => deleteProfileMutate()}
                deleteLoading={deleteProfilePending || isPostLogoutPending || deleteSuccess}
                />
            </ProfileOptions>
        </div>
    )
}

export { ProfileEditHeader };

type TProfileEditHeaderProps = {
    username: string
}