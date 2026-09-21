'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { resetPasswordSchema } from '../model/schema';
import { TResetPasswordFormValues } from '../model/types';
import {
    InputSecret,
    Button
} from '@/shared/ui';
import { useState } from 'react';
import { useResetPasswordMutation } from '../model/mutations';
import { motion } from "framer-motion";

const ResetPasswordForm = ({ token, resetPasswordSuccess, setResetPasswordSuccess }: TResetPasswordFormProps) => {
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            token: token
        }
    });

    const [resetPasswordError, setResetPasswordError] = useState("")

    const {mutate: resetPasswordMutate, isPending: resetPasswordPending} = useResetPasswordMutation({
        onSuccess: () => {
            setResetPasswordError("")
            setResetPasswordSuccess(true)
        },
        onError: (error) => {
            if (error.response) {
                setResetPasswordError(error.response.data.error)
            }
            else {
                setResetPasswordError("Ошибка сервера")
            }
        }
    })

    async function onSubmit(values: TResetPasswordFormValues) {
        setResetPasswordError("")
        resetPasswordMutate(values)
    }
    
    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={clsx(
        "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
        "flex flex-col gap-[2.7vw] items-center",
        "px-[6.6vw] py-[3.3vw]",
        "bp700px:border-[0.14vw] bp700px:rounded-[1.71vw] bp700px:gap-[1.43vw] bp700px:px-[3.43vw] bp700px:py-[1.71vw]",
        "bp1200px:border-[1px] bp700px:rounded-[12px] bp1200px:gap-[10px] bp700px:px-[24px] bp700px:py-[12px]",
        )}
        >
            <InputSecret
            placeholder='Пароль'
            {...register("password")}
            error={errors.password?.message}
            />

            <InputSecret
            placeholder='Повторение пароля'
            {...register("password_repeat")}
            error={errors.password_repeat?.message}
            />

            <Button
            text='Сбросить пароль'
            type='submit'
            variant={resetPasswordPending || resetPasswordSuccess ? 'ghost' : 'primary'}
            classNames={{
            root: "mt-[2.7vw] bp700px:mt-[1.43vw] bp1200px:mt-[10px]"
            }}
            disabled={resetPasswordPending || resetPasswordSuccess}
            />

            {resetPasswordError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{resetPasswordError}</motion.span>
            }
        </form>
    );
};

export { ResetPasswordForm };

type TResetPasswordFormProps = {
    token: string,
    resetPasswordSuccess: boolean,
    setResetPasswordSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}