'use client'

import {
    Modal,
    XmarkIcon,
    InputInline,
    Button
} from "@/shared/ui";
import clsx from "clsx";
import { useState } from "react";

const ProfileDeleteModal = ({ open, onClose, title, confirmText, onDelete, deleteLoading }: TProfileDeleteModalProps) => {
    const [confirm, setConfirm] = useState("")
    
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
                    "label_l2 text-texticon_base_warning select-none"
                    )}
                    >{title}</p>

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

                <p
                className={clsx(
                "caption_regular text-texticon_base_default select-none"
                )}
                >Введите следующий подтверждающий текст для удаления: <span className={clsx("text-texticon_base_accent")}>{confirmText}</span></p>

                <InputInline
                placeholder="Подтверждающий текст"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                />

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
                    onClick={onClose}
                    />

                    <Button
                    text='Удалить'
                    type='button'
                    onClick={onDelete}
                    variant={confirmText !== confirm || deleteLoading ? 'ghost' : 'warning'}
                    disabled={confirmText !== confirm || deleteLoading}
                    />
                </div>
            </div>
        </Modal>
    )
}

export { ProfileDeleteModal };

type TProfileDeleteModalProps = {
    open: boolean,
    onClose: () => void;
    title: string;
    confirmText: string;
    onDelete: () => void;
    deleteLoading: boolean
}