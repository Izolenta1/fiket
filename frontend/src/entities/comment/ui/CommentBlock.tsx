'use client'

import { AnimatePresence, motion } from "framer-motion";
import { TComment } from "../model/types";
import {
    useState,
    useRef,
    useEffect
} from "react";
import {
    PlugImage,
    PencilIcon,
    HalfArrowIcon
} from "@/shared/ui";
import { formatFullDate } from "@/shared/lib";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CommentLike } from "@/features/like-comment";

const CommentBlock = ({ comic_id, comment, page_number, isResponse, setResponseId, setResponseName, setResponseCommentText  }: TCommentBlockProps) => {
    const [fullText, setFullText] = useState<boolean | null>(null)
    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [openResponse, setOpenResponse] = useState(false)

    // Проверка на обрезку текста
    useEffect(() => {
        if (textRef.current && textRef.current.scrollHeight > textRef.current.clientHeight) {
            setFullText(false)
        }
    }, [comment.text])

    const scrollToCommentTextBlock = () => {
        document.getElementById('CommentTextBlock')?.scrollIntoView({
            behavior: 'smooth',
            block: "center",
        })
    }

    const router = useRouter()
    const goToUser = () => {
        if (comment.is_author) {
            router.push(`/profile/${comment.username}`)
        }
    }
    
    return (
        <motion.div
        id={`comment_${comment.id}`}
        className={clsx(
        "flex flex-col",
        "bg-surface_secondary",
        !isResponse ? "rounded-[3.3vw] border-[0.27vw] border-border_default p-[3.3vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw] bp700px:p-[1.71vw] bp1200px:rounded-[12px] bp1200px:border-[1px] bp1200px:p-[12px]" : "py-[3.3vw] bp700px:py-[1.71vw] bp1200px:py-[12px]"
        )}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {/* Аватарка и имя */}
            <button
            onClick={goToUser}
            className={clsx(
            "w-fit",
            comment.is_author === true && "increase_hover_anim hover:cursor-pointer"
            )}
            >
                <div
                className={clsx(
                "select-none",
                "flex items-center mb-[2.2vw]",
                "bp700px:mb-[1.14vw]",
                "bp1200px:mb-[8px]"
                )}
                >
                    <div
                    className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "rounded-[1.6vw] overflow-hidden",
                    "bp700px:w-[4.57vw] bp700px:h-[4.57vw] bp700px:rounded-[0.86vw]",
                    "bp1200px:w-[32px] bp1200px:h-[32px] bp1200px:rounded-[6px]"
                    )}
                    >
                        <PlugImage
                        src={comment.ava_url}
                        alt={comment.nickname}
                        imageClassName={clsx(
                        "w-full aspect-square"
                        )}
                        />
                    </div>

                    <span
                    className={clsx(
                    "ml-[2.7vw]",
                    "caption_regular text-texticon_base_header",
                    "bp700px:!font-[600] bp700px:ml-[1.43vw]",
                    "bp1200px:ml-[10px]"
                    )}
                    >{comment.nickname}</span>

                    {comment.is_author &&
                    <PencilIcon
                    svg_className={clsx(
                    "ml-[1.1vw] w-[3.3vw] h-[3.3vw]",
                    "bp700px:w-[2.29vw] bp700px:h-[2.29vw] bp700px:ml-[0.57vw]",
                    "bp700px:w-[16px] bp700px:h-[16px] bp700px:ml-[4px]"
                    )}
                    path_className={clsx(
                    "fill-texticon_base_unactive"
                    )}
                    />}
                </div>
            </button>

            {/* Текст комментария */}
            <p
            ref={textRef}
            className={clsx(
            "caption_regular text-texticon_base_default",
            fullText ? "" : "line-clamp-4",
            fullText != null ? "" : "mb-[3.3vw] bp700px:mb-[3.43vw] bp1200px:mb-[24px]"
            )}
            >{comment.text}</p>

            {fullText != null &&
            <button
            onClick={() => setFullText(!fullText)}
            className={clsx(
            "increase_hover_anim hover:cursor-pointer",
            "w-fit mb-[3.3vw]",
            "caption_regular text-texticon_base_unactive underline underline-offset-2",
            "bp700px:mb-[3.43vw]",
            "bp1200px:mb-[24px]"
            )}
            >{fullText ? "Свернуть" : "Показать полностью"}</button>
            }

            {/* Кнопки лайка и ответа и дата */}
            <div
            className={clsx(
            "select-none",
            "flex items-center gap-[2.2vw]",
            "caption_regular text-texticon_base_subheader",
            "bp700px:gap-[1.14vw]",
            "bp1200px:gap-[8px]"
            )}
            >
                <CommentLike
                comic_id={comic_id}
                comment_id={comment.id}
                page_number={page_number}
                liked={comment.liked}
                count_likes={comment.count_likes}
                />

                <button
                className={clsx(
                "increase_hover_anim hover:cursor-pointer"
                )}
                onClick={() => {setResponseId(comment.id); setResponseName(comment.nickname); setResponseCommentText(comment.text); scrollToCommentTextBlock()}}
                >Ответить</button>

                <span
                className={clsx(
                "text-texticon_base_unactive ml-auto"
                )}
                >{formatFullDate(comment.created_at)}</span>
            </div>

            {/* Враппер дочерних комментариев */}
            {comment.answers.length > 0 && 
            <div
            className={clsx(
            "flex gap-[2.7vw]",
            "mt-[3.3vw]",
            "bp700px:mt-[3.43vw] bp700px:gap-[1.43vw]",
            "bp1200px:mt-[24px] bp1200px:gap-[10px]"
            )}
            >
                <div
                className={clsx(
                "w-[0.5vw] h-auto",
                "bg-texticon_base_unactive rounded-r-[3.3vw]",
                "bp700px:w-[0.29vw] bp700px:rounded-r-[1.71vw]",
                "bp1200px:w-[2px] bp1200px:rounded-r-[12px]"
                )}
                />

                <div
                className={clsx(
                "w-full flex flex-col"
                )}
                >
                    <button
                    onClick={() => setOpenResponse(!openResponse)}
                    className={clsx(
                    "flex items-center justify-between grow"
                    )}
                    >
                        <span
                        className={clsx(
                        "increase_hover_anim hover:cursor-pointer",
                        "caption_regular text-texticon_base_unactive underline underline-offset-2 select-none"
                        )}
                        >Показать все ответы ({comment.answers.length})</span>

                        <div
                        className={clsx(
                        "increase_hover_anim hover:cursor-pointer"
                        )}
                        >
                            <HalfArrowIcon
                            svg_className={clsx(
                            "transition-transform duration-[400ms]",
                            "w-[5.5vw] h-[5.5vw]",
                            "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                            "bp1200px:w-[24px] bp1200px:h-[24px]",
                            openResponse ? "rotate-90" : "rotate-270"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_unactive"
                            )}
                            />
                        </div>
                    </button>

                    <AnimatePresence
                    initial={false}
                    >
                        {openResponse &&
                        <motion.div
                        key="children-comments"
                        className={clsx(
                        "flex flex-col gap-[3.3vw] overflow-hidden",
                        "mt-[3.3vw]",
                        "bp700px:gap-[1.71vw] bp700px:mt-[1.71vw]",
                        "bp1200px:gap-[12px] bp1200px:mt-[12px]"
                        )}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {comment.answers.map(childComment =>
                            <CommentBlock
                            comic_id={comic_id}
                            key={childComment.id}
                            comment={childComment}
                            page_number={page_number}
                            isResponse={true}
                            setResponseId={setResponseId}
                            setResponseName={setResponseName}
                            setResponseCommentText={setResponseCommentText}
                            />)}
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </div>}
        </motion.div>
    )
}

export { CommentBlock };

type TCommentBlockProps = {
    comic_id: string,
    comment: TComment,
    page_number: number,
    isResponse: boolean,
    setResponseId: React.Dispatch<React.SetStateAction<string>>
    setResponseName: React.Dispatch<React.SetStateAction<string>>
    setResponseCommentText: React.Dispatch<React.SetStateAction<string>>
}