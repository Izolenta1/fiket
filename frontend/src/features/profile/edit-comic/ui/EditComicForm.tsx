import { useGlobalToast } from "@/global/providers";
import { useRouter } from "next/navigation";
import { useGenres } from "@/entities";
import { TEditComicFormValues } from "../model/types";
import { editComicSchema } from "../model/schema";
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
import { usePatchComicMutation } from "../model/mutations";
import { processArraysInForm } from "@/shared/lib";
import clsx from "clsx";
import { ColumnWrapper } from "../../ui/ColumnWrapper";
import { ProfileTextInput } from "../../ui/ProfileTextInput";
import { ProfileModalInput } from "../../ui/profile-modal-input";
import { ProfileFileInput } from "../../ui/profile-file-input";
import { ProfileCarouselInput } from "../../ui/ProfileCarouselInput";
import { ProfileLineInput } from "../../ui/ProfileLineInput";
import {
    Button,
    ScrollbarWrapper,
    ModalToggle
} from "@/shared/ui";
import { motion } from "framer-motion";
import { AGE_VALUES } from "../model/fixtures";
import { useFullComic } from "@/entities";

const EditComicForm = ({ username, comic_transliterate_id }: TEditComicFormProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()

    const { data: comic } = useFullComic(comic_transliterate_id)
    const { data: genresList, isLoading: isGenresLoading } = useGenres()
    
    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<TEditComicFormValues>({
        resolver: zodResolver(editComicSchema),
        defaultValues: {
            description: "",
            genre_ids: [],
            age: "0",
            poster: [],
            banner: [],
            comic_status: "IN_PROGRESS",
            cost_type: "FREE",
            cost: ""
        }
    });

    useEffect(() => {
        if (comic && !isDirty) {
            reset({
                description: comic.description ?? "",
                genre_ids: comic.genres.map(genre => genre.id) ?? [],
                age: comic.age_rating.toString() as "0" | "6" | "12" | "18" ?? "0",
                comic_status: comic.status ?? "IN_PROGRESS",
                cost_type: comic.cost_type ?? "FREE",
                cost: comic.cost?.toString() ?? ""
            })
        }
    }, [comic])

    const [editComicError, setEditComicError] = useState("")

    const queryClient = useQueryClient()
    const {mutate: editComicMutate, isPending: editComicPending} = usePatchComicMutation({
        onSuccess: () => {
            setEditComicError("")
            createToast({ type: "positive", text: "Новая информация успешно сохранена." })

            queryClient.removeQueries({ queryKey: ["author_comics", username, "PAID"] })
            queryClient.removeQueries({ queryKey: ["author_comics", username, "FREE"] })
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для редактирования комикса необходима авторизация." })
            }
            else {
                setEditComicError(error.response?.data.error ?? "Ошибка редактирования.")
            }
        }
    })

    async function onSubmit(values: TEditComicFormValues) {
        setEditComicError("")
        editComicMutate({
            comic_id: comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1),
            editComicData: processArraysInForm({
                values,
            })
        })
    }

    function buttonVariant() {
        if (editComicPending) {
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
                    name="description"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Описание"
                        subText="Описание вашего комикса"
                        placeholder="Описание"
                        charLimit={2000}
                        value={field.value ?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.description?.message}
                        />
                    )}
                    />

                    <Controller
                    control={control}
                    name="genre_ids"
                    render={({ field }) => (
                        <ProfileModalInput
                        title="Жанры"
                        modalTitle="Жанры"
                        value={field.value ?? []}
                        selectedLabels={genresList?.genres.filter(genre => field.value.includes(genre.id)).map(genre => genre.name) ?? []}
                        error={errors.genre_ids?.message}
                        >
                            <ScrollbarWrapper
                            classNames={{
                            root: "max-h-[69.4vw] bp700px:max-h-[42.86vw] bp1200px:max-h-[350px]",
                            wrapper: "gap-[2.7vw] bp700px:gap-[1.43vw] bp1200px:gap-[10px]"
                            }}
                            >
                                {genresList?.genres.map(genreData =>
                                <ModalToggle
                                key={genreData.id}
                                name={genreData.name}
                                condition={field.value.includes(genreData.id)}
                                trueCallback={() => field.onChange([...field.value, genreData.id])}
                                falseCallback={() => field.onChange(field.value.filter(item => item !== genreData.id))}
                                />)}
                            </ScrollbarWrapper>
                        </ProfileModalInput>
                    )}
                    />

                    <Controller
                    control={control}
                    name="age"
                    render={({ field }) => (
                        <ProfileLineInput
                        title="Возрастное ограничение"
                        subText={`Укажите возрастное ограничение для уточнения возможного доступа к контенту`}
                        baseValues={AGE_VALUES}
                        value={field.value ?? ""}
                        onChange={(newAge) => field.onChange(newAge)}
                        error={errors.age?.message}
                        />
                    )}
                    />
                </ColumnWrapper>

                <ColumnWrapper>
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

                    <Controller
                    control={control}
                    name="banner"
                    render={({ field }) => (
                        <ProfileFileInput
                        title="Обложка"
                        subText={`Используйте файл формата PNG и JPG.\nРазмер изображения - 1920x400px`}
                        fileExt={[".png", ".jpg", ".jpeg"]}
                        maxFiles={1}
                        value={field.value ?? []}
                        onChange={(newFiles) => field.onChange(newFiles)}
                        error={errors.banner?.message}
                        />
                    )}
                    />

                    <Controller
                    control={control}
                    name="comic_status"
                    render={({ field }) => (
                        <ProfileCarouselInput
                        title="Статус комикса"
                        subText="Укажите текущий статус комикса"
                        error={errors.comic_status?.message}
                        >
                            <Button
                            text="Выходит"
                            variant={field.value === "IN_PROGRESS" ? "primary" : "secondaryAlt"}
                            type="button"
                            onClick={() => field.onChange("IN_PROGRESS")}
                            classNames={{
                            wrapper: "min-w-[120px]"
                            }}
                            />

                            <Button
                            text="Приостановлен"
                            variant={field.value === "EXCEPTED" ? "primary" : "secondaryAlt"}
                            type="button"
                            onClick={() => field.onChange("EXCEPTED")}
                            classNames={{
                            wrapper: "min-w-[120px]"
                            }}
                            />

                            <Button
                            text="Вышел"
                            variant={field.value === "COMPLETED" ? "primary" : "secondaryAlt"}
                            type="button"
                            onClick={() => field.onChange("COMPLETED")}
                            classNames={{
                            wrapper: "min-w-[120px]"
                            }}
                            />
                        </ProfileCarouselInput>
                    )}
                    />

                    {comic?.cost_type !== "FREE" &&
                    <Controller
                    control={control}
                    name="cost"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Стоимость"
                        subText="Стоимость комикса в рублях"
                        placeholder="Стоимость"
                        charLimit={5}
                        value={field.value ?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.cost?.message}
                        />
                    )}
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
                text='Сохранить'
                type='submit'
                variant={buttonVariant()}
                disabled={editComicPending}
                />
            </div>

            {editComicError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{editComicError}</motion.span>}
        </form>
    );
};

export { EditComicForm };

type TEditComicFormProps = {
    username: string;
    comic_transliterate_id: string
}