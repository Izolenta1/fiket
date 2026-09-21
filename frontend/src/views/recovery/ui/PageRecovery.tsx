'use client'

import { ResetPasswordForm } from "@/features/auth";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthInfo } from "@/widgets";
import { AnimatedMain } from "@/shared/ui";

const PageRecovery = ({ nickname, token }: TPageRecoveryProps) => {
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false)
    
    return (
        <AnimatedMain>
            <AnimatePresence
            initial={false}
            mode="wait"
            >
                <motion.div
                key={resetPasswordSuccess.toString()}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={clsx(
                "flex flex-col"
                )}
                >
                    {resetPasswordSuccess &&
                    <AuthInfo
                    type="positive"
                    headerText="Пароль изменен!"
                    bodyText="Ваш пароль успешно изменён. Теперь вы можете войти, используя новые данные."
                    />
                    }

                    {!resetPasswordSuccess &&
                    <div
                    className={clsx(
                    "w-full flex flex-col self-center gap-[3.3vw]",
                    "bp700px:w-[65.71vw] bp700px:gap-[1.71vw]",
                    "bp1200px:w-[540px] bp1200px:gap-[12px]"
                    )}
                    >
                        <h1
                        className={clsx(
                        "select-none",
                        "label_l1 text-texticon_base_header"
                        )}
                        >{nickname}</h1>

                        <ResetPasswordForm
                        token={token}
                        resetPasswordSuccess={resetPasswordSuccess}
                        setResetPasswordSuccess={setResetPasswordSuccess}
                        />
                    </div>
                    }
                </motion.div>
            </AnimatePresence>
        </AnimatedMain>
    )
}

export { PageRecovery };

type TPageRecoveryProps = {
    nickname: string,
    token: string
}