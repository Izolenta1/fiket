'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { motion } from "framer-motion";
import clsx from 'clsx'
import { recoverySchema } from '../model/schema';
import { TRecoveryFormValues } from '../model/types';
import { useRecoveryMutation } from '../model/mutations';
import { useGlobalToast } from '@/global/providers';

const RecoveryForm = () => {
    const { createToast } = useGlobalToast()

    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TRecoveryFormValues>({
        resolver: zodResolver(recoverySchema)
    });

    const [recoveryError, setRecoveryError] = useState("")
    const [recoverySuccess, setRecoverySuccess] = useState(false)

    const {mutate: recoveryMutate, isPending: recoveryPending} = useRecoveryMutation({
        onSuccess: () => {
            setRecoveryError("")
            setRecoverySuccess(true)
            createToast({ type: "positive", text: "Письмо для сброса пароля отправлено вам на почту" })
        },
        onError: (error) => {
            if (error.response) {
                setRecoveryError(error.response.data.error)
            }
            else {
                setRecoveryError("Ошибка сервера")
            }
        }
    })

    async function onSubmit(values: TRecoveryFormValues) {
        setRecoveryError("")
        recoveryMutate(values)
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
            <Input
            placeholder='Почта'
            type='email'
            additionalText='Пожалуйста, укажите почту которую вы указывали при регистрации. Мы отправим ссылку на восстановление на почту.'
            {...register("email")}
            error={errors.email?.message}
            />

            <Button
            text='Сбросить пароль'
            type='submit'
            variant={recoveryPending || recoverySuccess ? 'ghost' : 'primary'}
            classNames={{
            root: "mt-[2.7vw] bp700px:mt-[1.43vw] bp1200px:mt-[10px]"
            }}
            disabled={recoveryPending || recoverySuccess}
            />

            {recoveryError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{recoveryError}</motion.span>
            }
        </form>
    );
};

export { RecoveryForm };