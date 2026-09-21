'use client'

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {
Input,
InputDate,
InputSecret,
InputAgreement,
Button } from '@/shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { registrationSchema } from '../model/schema';
import { TRegistrationFormValues } from '../model/types';
import { motion } from "framer-motion";
import { useState } from 'react';
import { useRegistrationMutation } from '../model/mutations';
import { useGlobalToast } from '@/global/providers';

const RegistrationForm = () => {
    const { createToast } = useGlobalToast()
    
    const { 
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<TRegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            agreement: false,
            politics: false
        }
    });

    const [registrationError, setRegistrationError] = useState("")
    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const {mutate: registrationMutate, isPending: registrationPending} = useRegistrationMutation({
        onSuccess: () => {
            setRegistrationError("")
            setRegistrationSuccess(true)
            createToast({ type: "positive", text: "Письмо для подтверждения аккаунта отправлено вам на почту. Если письма нет, проверьте папку спама." })
        },
        onError: (error) => {
            if (error.response) {
                setRegistrationError(error.response.data.error)
            }
            else {
                setRegistrationError("Ошибка сервера")
            }
        }
    })

    async function onSubmit(values: TRegistrationFormValues) {
        setRegistrationError("")
        registrationMutate(values)
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
            placeholder='Логин'
            type='text'
            additionalText='Это поле не получится изменить'
            {...register("username")}
            error={errors.username?.message}
            />

            <Controller
            control={control}
            name='birthday'
            render={({ field }) => (
                <InputDate
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    error={errors.birthday?.message}
                />
            )}
            />

            <Input
            placeholder='Почта'
            type='email'
            {...register("email")}
            error={errors.email?.message}
            />

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

            <Controller
            control={control}
            name='agreement'
            render={({ field }) => (
                <InputAgreement
                value={field.value}
                trueCallback={() => field.onChange(true)}
                falseCallback={() => field.onChange(false)}
                error={errors.agreement?.message}
                >
                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_header"
                    )}
                    >Я ознакомлен и принимаю все условия</span>
                    <Link
                    className={clsx(
                    "w-fit increase_hover_anim",
                    "caption_regular text-texticon_base_accent underline underline-offset-2 decoration-skip-ink-none"
                    )}
                    href="/agreement"
                    >пользовательского соглашения</Link>
                </InputAgreement>
            )}
            />

            <Controller
            control={control}
            name='politics'
            render={({ field }) => (
                <InputAgreement
                value={field.value}
                trueCallback={() => field.onChange(true)}
                falseCallback={() => field.onChange(false)}
                error={errors.politics?.message}
                >
                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_header"
                    )}
                    >Я ознакомлен и принимаю все условия</span>
                    <Link
                    className={clsx(
                    "w-fit increase_hover_anim",
                    "caption_regular text-texticon_base_accent underline underline-offset-2 decoration-skip-ink-none"
                    )}
                    href="/politics"
                    >политики обработки персональных данных</Link>
                </InputAgreement>
            )}
            />

            <Button
            text='Зарегистрироваться'
            type='submit'
            variant={registrationPending || registrationSuccess ? 'ghost' : 'primary'}
            classNames={{
            root: "mt-[2.7vw] bp700px:mt-[1.43vw] bp1200px:mt-[10px]"
            }}
            disabled={registrationPending || registrationSuccess}
            />

            {registrationError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{registrationError}</motion.span>
            }
        </form>
    );
};

export { RegistrationForm };