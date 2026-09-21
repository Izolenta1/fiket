'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from 'clsx';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Input } from '@/shared/ui';
import { InputSecret } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { authSchema } from '../model/schema';
import { TAuthFormValues } from '../model/types';
import { useAuthMutation } from '../model/mutations';

const AuthForm = () => {
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TAuthFormValues>({
        resolver: zodResolver(authSchema)
    });

    const [authError, setAuthError] = useState("")
    const [authSuccess, setAuthSuccess] = useState(false)

    const {mutate: authMutate, isPending: authPending} = useAuthMutation({
        onSuccess: () => {
            setAuthError("")
            setAuthSuccess(true)
            window.location.href = "/";
        },
        onError: (error) => {
            if (error.response) {
                setAuthError(error.response.data.error)
            }
            else {
                setAuthError("Ошибка сервера")
            }
        }
    })

    async function onSubmit(values: TAuthFormValues) {
        setAuthError("")
        authMutate(values)
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
            placeholder='Почта или логин'
            type='text'
            {...register("username")}
            error={errors.username?.message}
            />

            <InputSecret
            placeholder='Пароль'
            {...register("password")}
            error={errors.password?.message}
            />

            <Button
            text='Войти'
            type='submit'
            variant={authPending || authSuccess ? 'ghost' : 'primary'}
            classNames={{
            root: "mt-[2.7vw] bp700px:mt-[1.43vw] bp1200px:mt-[10px]"
            }}
            disabled={authPending || authSuccess}
            />

            {authError &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit self-start",
            "caption_regular text-texticon_base_warning"
            )}>{authError}</motion.span>
            }
        </form>
    );
};

export { AuthForm };