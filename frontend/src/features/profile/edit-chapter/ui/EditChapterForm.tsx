import { useGlobalToast } from "@/global/providers";
import { useRouter } from "next/navigation";
import { TEditChapterFormValues } from "../model/types";
import { editChapterSchema } from "../model/schema";
import {
    useForm,
    Controller
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useState,
    useEffect
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePatchChapterMutation } from "../model/mutations";
import { processArraysInForm } from "@/shared/lib";
import clsx from "clsx";
import { ColumnWrapper } from "../../ui/ColumnWrapper";
import { ProfileTextInput } from "../../ui/ProfileTextInput";
import { ProfileFileInput } from "../../ui/profile-file-input";
import { Button } from "@/shared/ui";
import { motion } from "framer-motion";
import { useChapter } from "@/entities";

const EditChapterForm = ({ username, comic_transliterate_id, chapter_id }: TEditChapterFormProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()
    
    const { data: chapter } = useChapter(chapter_id)

    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<TEditChapterFormValues>({
        resolver: zodResolver(editChapterSchema),
        defaultValues: {
            name: "",
            poster: [],
            pages: []
        }
    });

    useEffect(() => {
        if (chapter && !isDirty) {
            reset({
                name: chapter.chapter_name ?? "",
            })
        }
    }, [chapter])

    const [editChapterError, setEditChapterError] = useState("")

    const queryClient = useQueryClient()
    const {mutate: editChapterMutate, isPending: editChapterPending} = usePatchChapterMutation({
        onSuccess: () => {
            setEditChapterError("")
            createToast({ type: "positive", text: "Новая информация успешно сохранена." })

            queryClient.removeQueries({ queryKey: ["chapters", comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)] })
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для редактирования главы необходима авторизация." })
            }
            else {
                setEditChapterError(error.response?.data.error ?? "Ошибка создания.")
            }
        }
    })

    async function onSubmit(values: TEditChapterFormValues) {
        setEditChapterError("")
        editChapterMutate({
            chapter_id: chapter_id,
            editChapterData: processArraysInForm({
                values
            })
        })
    }

    function buttonVariant() {
        if (editChapterPending) {
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
                text='Сохранить'
                type='submit'
                variant={buttonVariant()}
                disabled={editChapterPending}
                />
            </div>

            {editChapterError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{editChapterError}</motion.span>}
        </form>
    );
};

export { EditChapterForm };

type TEditChapterFormProps = {
    username: string;
    comic_transliterate_id: string;
    chapter_id: string
}