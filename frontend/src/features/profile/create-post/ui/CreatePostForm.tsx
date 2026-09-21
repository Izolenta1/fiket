'use client'

import { useGlobalToast } from "@/global/providers";
import { useRouter } from "next/navigation";
import { TCreatePostFormValues } from "../model/types";
import { createPostSchema } from "../model/schema";
import {
    useForm,
    Controller
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { usePutPostMutation } from "../model/mutations";
import { processArraysInForm } from "@/shared/lib";
import clsx from "clsx";
import { ColumnWrapper } from "../../ui/ColumnWrapper";
import { ProfileTextInput } from "../../ui/ProfileTextInput";
import { ProfileFileInput } from "../../ui/profile-file-input";
import { ProfilePollInput } from "../../ui/ProfilePollInput";
import { Button } from "@/shared/ui";
import { motion } from "framer-motion";
import { processPollOptions } from "../lib/processPollOptions";
import { useQueryClient } from "@tanstack/react-query";

const CreatePostForm = ({ username }: TCreatePostFormProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()
    
    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TCreatePostFormValues>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            text: "",
            images: [],
            poll: ["", ""]
        }
    });

    const [createPostError, setCreatePostError] = useState("")

    const queryClient = useQueryClient()
    const {mutate: createPostMutate, isPending: createPostPending} = usePutPostMutation({
        onSuccess: () => {
            setCreatePostError("")
            createToast({ type: "positive", text: "Новый пост успешно создан." })

            queryClient.removeQueries({ queryKey: ["posts", username] })
            reset()
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для создания поста необходима авторизация." })
            }
            else {
                setCreatePostError(error.response?.data.error ?? "Ошибка создания.")
            }
        }
    })

    async function onSubmit(values: TCreatePostFormValues) {
        setCreatePostError("")
        createPostMutate(processArraysInForm({
            values,
            fieldOptions: [
                {key: "poll", function: processPollOptions }
            ]
        }))
    }

    function buttonVariant() {
        if (createPostPending) {
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
                    name="text"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Описание"
                        subText="Текст создаваемого поста"
                        placeholder="Описание"
                        charLimit={2500}
                        value={field.value?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.text?.message}
                        />
                    )}
                    />

                    <Controller
                    control={control}
                    name="images"
                    render={({ field }) => (
                        <ProfileFileInput
                        title="Изображения"
                        subText={`Используйте файл формата PNG и JPG.\n(До 6 изображений)`}
                        fileExt={[".png", ".jpg", ".jpeg"]}
                        maxFiles={6}
                        value={field.value ?? []}
                        onChange={(newFiles) => field.onChange(newFiles)}
                        error={errors.images?.message}
                        />
                    )}
                    />
                </ColumnWrapper>

                <ColumnWrapper>
                    <Controller
                    control={control}
                    name="poll"
                    render={({ field }) => (
                        <ProfilePollInput
                        title="Опрос"
                        subText={`Не больше 10 пунктов`}
                        options={field.value ?? ["", ""]}
                        onChange={(newPoll) => field.onChange(newPoll)}
                        error={errors.images?.message}
                        />
                    )}
                    />
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
                text='Создать'
                type='submit'
                variant={buttonVariant()}
                disabled={createPostPending}
                />
            </div>

            {createPostError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{createPostError}</motion.span>}
        </form>
    );
};

export { CreatePostForm };

type TCreatePostFormProps = {
    username: string
}