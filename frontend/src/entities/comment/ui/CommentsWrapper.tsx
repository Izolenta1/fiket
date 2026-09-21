import { CommentBlock } from "./CommentBlock"
import { useComicComments } from "../model/queries"
import {
    LoadingBlock,
    NoDataPlug
} from "@/shared/ui"
import clsx from "clsx"

const CommentsWrapper = ({ comic_id, setResponseId, setResponseName, setResponseCommentText }: TCommentsWrapperProps) => {
	const { data: comments, ref: commentsLoadingRef, hasNextPage: isCommentsNext, isLoading: isCommentsLoading, enabled: isCommentsEnabled } = useComicComments(comic_id)

    // Функция отрисовки списка
	const renderComments = () => {
        if (comments) {
            if (comments.pages[0].answer.length <= 0) {
                return <NoDataPlug text="У этого комикса пока еще нет комментариев :/" />
            }
            
			return comments.pages.map((group, i) => (
                group.answer.map((comment) => (
                    <CommentBlock
                    comic_id={comic_id}
                    key={comment.id}
                    comment={comment}
                    page_number={i}
                    isResponse={false}
                    setResponseId={setResponseId}
                    setResponseName={setResponseName}
                    setResponseCommentText={setResponseCommentText}
                    />
                ))
			))
		}
	}
    
    return (
        <>
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[3.43vw]",
            "bp1200px:gap-[24px]"
            )}
            >
                {renderComments()}
            </div>

            <div
            ref={commentsLoadingRef}
            className={clsx(
            (!isCommentsEnabled || isCommentsNext || isCommentsLoading) ? "" : "hidden"
            )}
            >
                <LoadingBlock />
            </div>
        </>
    )
}

export { CommentsWrapper };

type TCommentsWrapperProps = {
    comic_id: string,
    setResponseId: React.Dispatch<React.SetStateAction<string>>
    setResponseName: React.Dispatch<React.SetStateAction<string>>
    setResponseCommentText: React.Dispatch<React.SetStateAction<string>>
}