'use client'

import clsx from "clsx";
import {
    Input,
    Button
} from "@/shared/ui";
import {
    useForm,
    Controller
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCreateQuestionFormValues } from "../model/types";
import { createQuestionSchema } from "../model/schema";
import { useState } from "react";
import { usePutQuestionMutation } from "../model/mutations";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import { motion } from "framer-motion";

const AskQuestionForm = () => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    
    const { 
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TCreateQuestionFormValues>({
        resolver: zodResolver(createQuestionSchema),
        defaultValues: {
            text: ""
        }
    });

    const [questionError, setQuestionError] = useState("")
    
    const {mutate: createQuestionMutate, isPending: createQuestionPending} = usePutQuestionMutation({
        onSuccess: () => {
            setQuestionError("")
            createToast({ type: "positive", text: "Ваш вопрос отправлен. Скоро здесь может появиться на него ответ." })
            reset()
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для вопроса необходима авторизация." })
            }
            else {
                setQuestionError(error.response?.data.error ?? "Ошибка создания.")
            }
        }
    })

    async function onSubmit(values: TCreateQuestionFormValues) {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для вопроса необходима авторизация." })
            return
        }
        
        setQuestionError("")
        createQuestionMutate(values)
    }

    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={clsx(
        "flex flex-col gap-[3.3vw] w-full",
        "px-[6.6vw] py-[3.3vw]",
        "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
        "bp700px:max-w-[65.71vw] bp700px:gap-[1.71vw] bp700px:px-[3.43vw] bp700px:py-[1.71vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:max-w-[540px] bp1200px:gap-[12px] bp1200px:px-[24px] bp1200px:py-[12px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
        )}
        >
            <h2
            className={clsx(
            "label_l2 text-texticon_base_header select-none"
            )}
            >Задать вопрос</h2>

            <Controller
            control={control}
            name="text"
            render={({ field }) => (
                <Input
                placeholder="Вопрос"
                value={field.value?? ""}
                onChange={(value) => field.onChange(value)}
                error={errors.text?.message}
                />
            )}
            />

            <Button
            text="Задать вопрос"
            type="submit"
            variant={createQuestionPending ? "ghost" : "primary"}
            classNames={{
            wrapper: "mt-[8px]"
            }}
            disabled={createQuestionPending}
            />

            {questionError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{questionError}</motion.span>}
        </form>
    )
}

export { AskQuestionForm };