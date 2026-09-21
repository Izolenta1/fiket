import { useGlobalToast } from "@/global/providers";
import { useRouter } from "next/navigation";
import { TCreateComicFormValues } from "../model/types";
import { createComicSchema } from "../model/schema";
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
import { usePutComicMutation } from "../model/mutations";
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
import { useGenres } from "@/entities";
import { ComicTypeButton } from "./ComicTypeButton";
import { AGE_VALUES } from "../model/fixtures";

const CreateComicForm = ({ username }: TCreateComicFormProps) => {
    const { createToast } = useGlobalToast()
    const router = useRouter()

    const { data: genresList, isLoading: isGenresLoading } = useGenres()
    
    const { 
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<TCreateComicFormValues>({
        resolver: zodResolver(createComicSchema),
        defaultValues: {
            name: "",
            description: "",
            genre_ids: [],
            poster: [],
            banner: [],
            comic_type: "VERTICAL",
            age: "0",
            publisher: "",
            cost_type: "FREE",
            cost: ""
        }
    });

    const [createComicError, setCreateComicError] = useState("")

    const queryClient = useQueryClient()
    const {mutate: createComicMutate, isPending: createComicPending} = usePutComicMutation({
        onSuccess: () => {
            setCreateComicError("")
            createToast({ type: "positive", text: "Новый комикс успешно создан." })

            queryClient.removeQueries({ queryKey: ["author_comics", username, "PAID"] })
            queryClient.removeQueries({ queryKey: ["author_comics", username, "FREE"] })
            reset()
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для создания комикса необходима авторизация." })
            }
            else {
                setCreateComicError(error.response?.data.error ?? "Ошибка создания.")
            }
        }
    })

    async function onSubmit(values: TCreateComicFormValues) {
        setCreateComicError("")
        createComicMutate(processArraysInForm({
            values,
        }))
    }

    function buttonVariant() {
        if (createComicPending) {
            return "ghost"
        }

        if (Object.keys(errors).length > 0) {
            return "warning"
        }

        return "primary"
    }

    // Сброс стоимости при изменении типа стоимости
    const costTypeValue = watch("cost_type");
    useEffect(() => {
        setValue("cost", "");
    }, [costTypeValue, setValue])

    
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
                        subText="Название вашего будущего комикса. Его нельзя будет изменить в будущем!"
                        placeholder="Название"
                        charLimit={100}
                        value={field.value ?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.name?.message}
                        />
                    )}
                    />

                    <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Описание"
                        subText="Описание вашего будущего комикса"
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
                </ColumnWrapper>

                <ColumnWrapper>
                    <Controller
                    control={control}
                    name="comic_type"
                    render={({ field }) => (
                        <ProfileCarouselInput
                        title="Тип комикса"
                        subText="Укажите тип комикса для корректного расположения страниц"
                        error={errors.comic_type?.message}
                        >
                            <ComicTypeButton
                            onClick={() => field.onChange("VERTICAL")}
                            value={field.value}
                            text="Вертикально"
                            buttonType="VERTICAL"
                            />

                            <ComicTypeButton
                            onClick={() => field.onChange("HORIZONTAL")}
                            value={field.value}
                            text="Горизонтально"
                            buttonType="HORIZONTAL"
                            />
                        </ProfileCarouselInput>
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

                    <Controller
                    control={control}
                    name="publisher"
                    render={({ field }) => (
                        <ProfileTextInput
                        title="Издательство"
                        subText="При необходимости"
                        placeholder="Издательство"
                        charLimit={255}
                        value={field.value ?? ""}
                        onChange={(value) => field.onChange(value)}
                        error={errors.publisher?.message}
                        />
                    )}
                    />

                    <Controller
                    control={control}
                    name="cost_type"
                    render={({ field }) => (
                        <ProfileCarouselInput
                        title="Доступность комикса"
                        subText="Платный или бесплатный"
                        availability={false}
                        error={errors.cost_type?.message}
                        >
                            <Button
                            text="Общий"
                            variant={field.value === "FREE" ? "primary" : "secondaryAlt"}
                            type="button"
                            onClick={() => field.onChange("FREE")}
                            />

                            <Button
                            text="Платный"
                            variant={field.value === "PAID" ? "primary" : "secondaryAlt"}
                            type="button"
                            onClick={() => field.onChange("PAID")}
                            />
                        </ProfileCarouselInput>
                    )}
                    />

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
                        availability={costTypeValue === "PAID"}
                        error={errors.cost?.message}
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
                disabled={createComicPending}
                />
            </div>

            {createComicError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{createComicError}</motion.span>}
        </form>
    );
};

export { CreateComicForm };

type TCreateComicFormProps = {
    username: string
}