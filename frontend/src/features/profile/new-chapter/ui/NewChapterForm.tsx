import { useGlobalToast } from "@/global/providers";
import { useRouter } from "next/navigation";
import { TCreateChapterFormValues } from "../model/types";
import { createChapterSchema } from "../model/schema";
import {
    useForm,
    Controller
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePutChapterMutation } from "../model/mutations";
import { processArraysInForm } from "@/shared/lib";
import clsx from "clsx";
import { ColumnWrapper } from "../../ui/ColumnWrapper";
import { ProfileTextInput } from "../../ui/ProfileTextInput";
import { ProfileFileInput } from "../../ui/profile-file-input";
import { Button } from "@/shared/ui";
import { motion } from "framer-motion";

const NewChapterForm = ({ username, comic_transliterate_id }: TNewChapterFormProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()
    
    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TCreateChapterFormValues>({
        resolver: zodResolver(createChapterSchema),
        defaultValues: {
            comic_id: comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1),
            name: "",
            poster: [],
            pages: []
        }
    });

    const [createChapterError, setCreateChapterError] = useState("")

    const queryClient = useQueryClient()
    const {mutate: createChapterMutate, isPending: createChapterPending} = usePutChapterMutation({
        onSuccess: () => {
            setCreateChapterError("")
            createToast({ type: "positive", text: "Новая глава успешно добавлена." })

            queryClient.removeQueries({ queryKey: ["chapters", comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)] })
            reset()
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для создания главы необходима авторизация." })
            }
            else {
                setCreateChapterError(error.response?.data.error ?? "Ошибка создания.")
            }
        }
    })

    async function onSubmit(values: TCreateChapterFormValues) {
        setCreateChapterError("")
        createChapterMutate(processArraysInForm({
            values
        }))
    }

    function buttonVariant() {
        if (createChapterPending) {
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
                    name="name"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Название"
                        subText="Название вашей будущей главы"
                        placeholder="Название"
                        charLimit={100}
                        value={field.value?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.name?.message}
                        />
                    )}
                    />

                    <Controller
                    control={control}
                    name="poster"
                    render={({ field }) => (
                        <ProfileFileInput
                        title="Постер"
                        subText={`Используйте файл формата PNG и JPG.\nРазмер изображения - 720x1040px`}
                        fileExt={[".png", ".jpg", ".jpeg"]}
                        maxFiles={1}
                        value={field.value ?? []}
                        onChange={(newFiles) => field.onChange(newFiles)}
                        error={errors.poster?.message}
                        />
                    )}
                    />
                </ColumnWrapper>

                <ColumnWrapper>
                    <Controller
                    control={control}
                    name="pages"
                    render={({ field }) => (
                        <ProfileFileInput
                        title="Страницы"
                        subText={`Используйте файл формата PDF. Рекомендованный размер страниц для горизонтального комикса (1200х1800px). Рекомендованный размер страниц для вертикального комикса (1200px по ширине)`}
                        fileExt={[".pdf"]}
                        maxFiles={1}
                        value={field.value ?? []}
                        onChange={(newFiles) => field.onChange(newFiles)}
                        error={errors.pages?.message}
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
                text='Добавить'
                type='submit'
                variant={buttonVariant()}
                disabled={createChapterPending}
                />
            </div>

            {createChapterError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{createChapterError}</motion.span>}
        </form>
    );
};

export { NewChapterForm };

type TNewChapterFormProps = {
    username: string;
    comic_transliterate_id: string
}