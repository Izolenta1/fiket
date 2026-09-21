'use client'

import {
    Modal,
    XmarkIcon,
    Button
} from "@/shared/ui";
import clsx from "clsx";
import { useLogoutMutation } from "../model/mutations";
import { useGlobalToast } from '@/global/providers';
import { useState } from 'react';

const LogoutModal = ({ open, onClose }: TLogoutModalProps) => {
    const { createToast } = useGlobalToast()

    const [logoutSuccess, setLogoutSuccess] = useState(false)

    const {mutate: postLogoutMutate, isPending: isPostLogoutPending} = useLogoutMutation({
        onSuccess: () => {
            setLogoutSuccess(true)
            window.location.replace('/')
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для выхода из аккаунта необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: "Ошибка выхода из аккаунта." })
            }
        }
    })
    
    return (
        <Modal
        open={open}
        onClose={onClose}
        >
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[2.29vw]",
            "bp1200px:gap-[20px]"
            )}
            >
                {/* Заголовок */}
                <div
                className={clsx(
                "flex items-center justify-between"
                )}
                >
                    <p
                    className={clsx(
                    "label_l2 text-texticon_base_header select-none"
                    )}
                    >Выйти из аккаунта</p>

                    <button
                    onClick={onClose}
                    className={clsx(
                    "cursor-pointer increase_hover_anim"
                    )}
                    >
                        <XmarkIcon
                        svg_className={clsx(
                        "w-[6.6vw] h-[6.6vw]",
                        "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                        "bp1200px:w-[32px] bp1200px:h-[32px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_header"
                        )}
                        />
                    </button>
                </div>

                <span
                className={clsx(
                "caption_regular text-texticon_base_default select-none"
                )}
                >Вы уверены, что хотите выйти из аккаунта?</span>

                <div
                className={clsx(
                "flex items-center gap-[1.6vw]",
                "bp700px:gap-[0.86vw]",
                "bp1200px:gap-[6px]"
                )}
                >
                    <Button
                    text="Остаться"
                    onClick={onClose}
                    variant="secondary"
                    disabled={isPostLogoutPending || logoutSuccess}
                    />

                    <Button
                    text="Выйти"
                    onClick={() => postLogoutMutate()}
                    variant={isPostLogoutPending || logoutSuccess ? "ghost" : "warning"}
                    disabled={isPostLogoutPending || logoutSuccess}
                    />
                </div>
            </div>
        </Modal>
    )
}

export { LogoutModal };

type TLogoutModalProps = {
    open: boolean,
    onClose: () => void;
}