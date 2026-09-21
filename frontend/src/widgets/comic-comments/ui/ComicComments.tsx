'use client'

import { CommentTextBlock } from "@/features/add-comment";
import { useState } from "react";
import { CommentsWrapper } from "@/entities";
import clsx from "clsx";

const ComicComments = ({ comic_id }: TComicCommentsProps) => {
    const [responseId, setResponseId] = useState("")
    const [responseName, setResponseName] = useState("")
    const [responseCommentText, setResponseCommentText] = useState("")

    return (
        <section
        className={clsx(
        "w-full flex flex-col gap-[3.3vw]",
        "bp700px:gap-[3.43vw]",
        "bp1200px:gap-[24px]"
        )}
        >
            <h2
            className={clsx(
            "label_l2 text-texticon_base_header select-none"
            )}
            >Комментарии</h2>

            <CommentTextBlock
            comic_id={comic_id}
            responseId={responseId}
            setResponseId={setResponseId}
            responseName={responseName}
            setResponseName={setResponseName}
            responseCommentText={responseCommentText}
            setResponseCommentText={setResponseCommentText}
            />

            {/* Разделитель */}
            <div
            className={clsx(
            "h-[0.5vw]",
            "bg-texticon_base_unactive rounded-[3.3vw]",
            "bp700px:h-[0.29vw] bp700px:rounded-[1.71vw]",
            "bp700px:h-[2px] bp700px:rounded-[12px]"
            )}
            />

            <CommentsWrapper
            comic_id={comic_id}
            setResponseId={setResponseId}
            setResponseName={setResponseName}
            setResponseCommentText={setResponseCommentText}
            />
        </section>
    )
}

export { ComicComments };

type TComicCommentsProps = {
    comic_id: string
}