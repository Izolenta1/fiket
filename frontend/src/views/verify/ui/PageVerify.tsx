'use client'

import { useVerifyMutation } from "@/features/auth";
import { useEffect, useEffectEvent } from "react";
import { AuthInfo } from "@/widgets";
import { LoadingBlock } from "@/shared/ui";
import { AnimatePresence, motion } from 'framer-motion'
import clsx from "clsx";
import { AnimatedMain } from "@/shared/ui";

const PageVerify = ({ token }: TPageVerifyProps) => {
    const {mutate: verifyMutate, isPending: verifyPending, isSuccess: verifySuccess, isError: verifyError} = useVerifyMutation({})

    const verifyEvent = useEffectEvent(() => {
        verifyMutate(token);
    })

    useEffect(() => {
        verifyEvent()
    }, [])
    
    return (
        <AnimatedMain>
            <AnimatePresence
            initial={false}
            mode="wait"
            >
                <motion.div
                key={verifyPending.toString()}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={clsx(
                "flex flex-col"
                )}
                >
                    {verifyPending &&
                    <LoadingBlock/>
                    }

                    {verifySuccess &&
                    <AuthInfo
                    type="positive"
                    headerText="Аккаунт подтвержден"
                    bodyText="Ваш аккаунт успешно подтверждён! Теперь вы можете пользоваться всеми возможностями сервиса без ограничений. Добро пожаловать!"
                    />
                    }

                    {verifyError &&
                    <AuthInfo
                    type="negative"
                    headerText="Аккаунт НЕ подтвержден"
                    bodyText="Не удалось подтвердить ваш аккаунт. Возможно, ссылка устарела или была использована ранее. Попробуйте заново пройти процесс регистрации."
                    />
                    }
                </motion.div>
            </AnimatePresence>
        </AnimatedMain>
    )
}

export { PageVerify };

type TPageVerifyProps = {
    token: string
}