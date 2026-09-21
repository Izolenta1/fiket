import {
    useEffect,
    useState,
    useRef
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    XmarkIcon,
    CheckIcon,
    DotLoadingBlock
} from "@/shared/ui";
import {
    useGlobalToast,
    useUser
} from "@/global/providers";
import { usePutCommentMutation } from "../model/mutations";
import {
    useQueryClient,
    type InfiniteData
} from "@tanstack/react-query";
import { TCommentsResponse } from "@/entities/comment/model/types";
import { produce } from "immer";
import clsx from "clsx";
import { addCommentRecursive } from "../lib/addCommentRecursive";

const CommentTextBlock = ({ comic_id, responseId, setResponseId, responseName, setResponseName, responseCommentText, setResponseCommentText }: TCommentTextBlockProps) => {
    const [comment, setComment] = useState("")
    const commentRef = useRef<HTMLTextAreaElement>(null)
    const { createToast } = useGlobalToast()
    const { user } = useUser()
    
    // Блок для расширения текстового поля комментария
    useEffect(() => {
        if (commentRef.current) {
            commentRef.current.style.height = "auto"
            commentRef.current.style.height = commentRef.current.scrollHeight + 'px';
        }

        if (comment.length > 2500) {
            setComment(comment.substring(0, 2500))
        }
    }, [comment])

    // Дообавление имени при ответе
    useEffect(() => {
        if (responseName) {
            setComment(prev => `${responseName}, ${prev}`)
        }
    }, [responseName])

    const queryClient = useQueryClient()
    const {mutate: putCommentMutate, isPending: isPutCommentPending} = usePutCommentMutation({
        onSuccess(data, { comic_id, parent_comment_id }) {
            queryClient.setQueryData<InfiniteData<TCommentsResponse>>(
                ["comments", comic_id],
                (prev) =>
                    prev &&
                    produce(prev, (draft) => {
                        const firstPage = draft.pages[0]
                        if (!firstPage) return

                        // Нет родителя — добавляем в корень
                        if (!parent_comment_id) {
                            firstPage.answer.unshift(data)
                            return
                        }

                        // Есть родитель — рекурсивно ищем и добавляем
                        addCommentRecursive(firstPage.answer, data, parent_comment_id)
                    })
            )

            setComment("")
            setResponseId("")
            setResponseName("")
            setResponseCommentText("")
            scrollToCommentBlock(parent_comment_id)
        },
        onError: (error) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для добавления комментария необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: "Ошибка сервера." })
            }
        }
    })

    function addComment() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для покупки комикса необходима авторизация." })
            return
        }

        if (comment.length < 10) {
            return
        }

        if (responseId) {
            putCommentMutate({ comic_id: comic_id, text: comment, parent_comment_id: responseId })
        }
        else {
            putCommentMutate({ comic_id: comic_id, text: comment })
        }
    }

    const scrollToCommentBlock = (comment_id?: string) => {
        document.getElementById(`comment_${comment_id}`)?.scrollIntoView({
            behavior: 'smooth',
            block: "center",
        })
    }
    
    return (
        <>
            <div
            id="CommentTextBlock"
            className={clsx(
            "flex flex-col",
            "p-[3.3vw]",
            "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
            "bp700px:p-[1.71vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:p-[12px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
            )}
            >
                {/* Часть ответного комментария */}
                <AnimatePresence
                initial={false}
                >
                    {responseId && 
                    <motion.div 
                    className={clsx(
                    "flex gap-[1.1vw]",
                    "mb-[3.3vw]",
                    "bp700px:gap-[0.57vw] bp700px:mb-[1.71vw]",
                    "bp1200px:gap-[4px] bp1200px:mb-[12px]"
                    )}
                    key="response-block"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <div
                        className={clsx(
                        "w-[0.27vw] h-auto",
                        "bg-texticon_base_unactive",
                        "bp700px:w-[0.14vw]",
                        "bp1200px:w-[1px]"
                        )}
                        />

                        <div
                        className={clsx(
                        "select-none",
                        "flex flex-col gap-[1.1vw] grow",
                        "bp700px:gap-[0.57vw]",
                        "bp1200px:gap-[4px]"
                        )}
                        >
                            <span
                            className={clsx(
                            "caption_regular text-texticon_base_default"
                            )}
                            >Ответ: {responseName}</span>

                            <span
                            className={clsx(
                            "comment_regular text-texticon_base_unactive line-clamp-1"
                            )}
                            >{responseCommentText}</span>
                        </div>

                        <button
                        className={clsx(
                        "hover:cursor-pointer increase_hover_anim"
                        )}
                        onClick={() => {setResponseId(""); setResponseName(""); setResponseCommentText("")}}
                        >
                            <XmarkIcon
                            svg_className={clsx(
                            "w-[5.5vw] h-[5.5vw]",
                            "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                            "bp1200px:w-[32px] bp1200px:h-[32px]"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_unactive"
                            )}
                            />
                        </button>
                    </motion.div>
                    }
                </AnimatePresence>

                {/* Основное поле */}
                <textarea
                ref={commentRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={2500}
                className={clsx(
                "mb-[3.3vw] outline-0 resize-none w-full",
                "input_regular text-texticon_base_header placeholder:text-texticon_base_unactive caret-texticon_base_accent",
                "bp700px:mb-[1.71vw]",
                "bp1200px:mb-[12px]"
                )}
                spellCheck="false"
                placeholder="Написать комментарий..."
                />

                {/* Информация о символах и кнопка отправки */}
                <div
                className={clsx(
                "flex justify-between items-end"
                )}
                >
                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_unactive select-none"
                    )}
                    >{comment.length} / 2500</span>

                    <button
                    onClick={addComment}
                    disabled={isPutCommentPending || comment.length < 10}
                    className={clsx(
                    "hover:cursor-pointer increase_hover_anim",
                    "flex justify-center items-center",
                    "p-[1.6vw]",
                    "bg-surface_body rounded-[50%]",
                    "bp700px:w-[4.57vw] bp700px:h-[4.57vw] bp700px:p-[0.86vw]",
                    "bp1200px:w-[32px] bp1200px:h-[32px] bp1200px:p-[6px]"
                    )}
                    >
                        <CheckIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]"
                        )}
                        path_className={clsx(
                        `transition-all duration-[400ms]`,
                        (comment.length >= 10 && !isPutCommentPending) ? "stroke-texticon_base_accent" : "stroke-texticon_base_unactive"
                        )}
                        />
                    </button>
                </div>
            </div>

            <AnimatePresence
            initial={false}
            >
                {isPutCommentPending &&
                <motion.div
                className={clsx(
                "w-fit"
                )}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <DotLoadingBlock />
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

export { CommentTextBlock };

type TCommentTextBlockProps = {
    comic_id: string,
    responseId: string,
    setResponseId: React.Dispatch<React.SetStateAction<string>>,
    responseName: string,
    setResponseName: React.Dispatch<React.SetStateAction<string>>,
    responseCommentText: string,
    setResponseCommentText: React.Dispatch<React.SetStateAction<string>>
}