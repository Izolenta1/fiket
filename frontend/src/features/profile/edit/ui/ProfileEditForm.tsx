'use client'

import clsx from "clsx";
import { ProfileTextInput } from "../../ui/ProfileTextInput";
import { ProfileFileInput } from "../../ui/profile-file-input";
import { ProfileSocialInput } from "../../ui/profile-social-input";
import {
    useForm,
    Controller
} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { TProfileEditFormValues } from "../model/types";
import { profileEditSchema } from "../model/schema";
import { Button } from "@/shared/ui";
import { useUserQuery } from "@/entities";
import {
    useEffect,
    useState
} from "react";
import { usePatchProfileMutation } from "../model/mutations";
import { useGlobalToast } from '@/global/providers';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { processArraysInForm } from "@/shared/lib";
import { ColumnWrapper } from "../../ui/ColumnWrapper";

const ProfileEditForm = ({ profileCondition, username }: TProfileEditFormProps) => {
    const { createToast } = useGlobalToast()
    const { data: userData } = useUserQuery(username)
    const router = useRouter()
    
    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<TProfileEditFormValues>({
        resolver: zodResolver(profileEditSchema),
        defaultValues: {
            nickname: "",
            ava: [],
            background: [],
            about: "",
            youtube: "",
            vk: "",
            tg: "",
            email: "",
            dzen: "",
            pinterest: ""
        }
    });

    useEffect(() => {
        if (userData && !isDirty) {
            reset({
                nickname: userData.nickname ?? "",
                about: userData.author?.about ?? "",
                youtube: userData.author?.media_social.youtube ?? "",
                vk: userData.author?.media_social.vk ?? "",
                tg: userData.author?.media_social.tg ?? "",
                email: userData.author?.media_social.email ?? "",
                dzen: userData.author?.media_social.dzen ?? "",
                pinterest: userData.author?.media_social.pinterest ?? ""
            })
        }
    }, [userData])

    const [editProfileError, setEditProfileError] = useState("")

    const {mutate: editProfileMutate, isPending: editProfilePending} = usePatchProfileMutation({
        onSuccess: () => {
            setEditProfileError("")
            createToast({ type: "positive", text: "Новые данные успешно сохранены." })
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для редактирования профиля необходима авторизация." })
            }
            else {
                setEditProfileError(error.response?.data.error ?? "Ошибка сохранения.")
            }
        }
    })

    async function onSubmit(values: TProfileEditFormValues) {
        setEditProfileError("")
        editProfileMutate(processArraysInForm({
            values
        }))
    }

    function buttonVariant() {
        if (editProfilePending) {
            return "ghost"
        }

        if (Object.keys(errors).length > 0) {
            return "warning"
        }

        return "primary"
    }
    
    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "bp700px:gap-[3.43vw]",
        "bp1200px:gap-[24px]"
        )}
        >
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[3.43vw]",
            "bp1200px:gap-[24px] bp1200px:grid bp1200px:grid-cols-2"
            )}
            >
                <ColumnWrapper>
                    <Controller
                    control={control}
                    name="nickname"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Имя профиля"
                        subText="Добавьте или измените имя профиля"
                        placeholder="Введите имя профиля"
                        charLimit={29}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        error={errors.nickname?.message}
                        />
                    )}
                    />

                    {profileCondition === "ME AUTHOR" &&
                    <Controller
                    control={control}
                    name="about"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="О себе"
                        subText="Текст, что расскажет о тебе, как об авторе"
                        placeholder="Описание"
                        charLimit={2500}
                        value={field.value ?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.about?.message}
                        />
                    )}
                    />}

                    <Controller
                    control={control}
                    name="ava"
                    render={({ field }) => (
                        <ProfileFileInput
                        title="Изменить аватар"
                        subText={`Используйте файл формата PNG и JPG.\nРазмер изображения - 512x512px`}
                        fileExt={[".png", ".jpg", ".jpeg"]}
                        maxFiles={1}
                        value={field.value ?? []}
                        onChange={(newFiles) => field.onChange(newFiles)}
                        error={errors.ava?.message}
                        />
                    )}
                    />
                </ColumnWrapper>

                <ColumnWrapper>
                    <Controller
                    control={control}
                    name="background"
                    render={({ field }) => (
                        <ProfileFileInput
                        title="Изменить баннер"
                        subText={`Используйте файл формата PNG и JPG.\nРазмер изображения - 1920x400px`}
                        fileExt={[".png", ".jpg", ".jpeg"]}
                        maxFiles={1}
                        value={field.value ?? []}
                        onChange={(newFiles) => field.onChange(newFiles)}
                        error={errors.background?.message}
                        />
                    )}
                    />

                    {profileCondition === "ME AUTHOR" &&
                    <ProfileSocialInput
                    title="Социальные сети"
                    subText="Ссылки и адреса ваших соц. сетей"
                    control={control}
                    error={errors.youtube?.message || errors.vk?.message || errors.tg?.message || errors.email?.message || errors.dzen?.message || errors.pinterest?.message}
                    />}
                </ColumnWrapper>
            </div>

            <div
            className={clsx(
            "flex items-center gap-[1.6vw]",
            "bp700px:gap-[0.86vw]",
            "bp1200px:gap-[6px]"
            )}
            >
                <Button
                text='Назад'
                type='button'
                variant='secondary'
                onClick={() => router.back()}
                />

                <Button
                text='Применить'
                type='submit'
                variant={buttonVariant()}
                disabled={editProfilePending}
                />
            </div>

            {editProfileError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{editProfileError}</motion.span>}
        </form>
    );
};

export { ProfileEditForm };

type TProfileEditFormProps = {
    profileCondition: string,
    username: string
}