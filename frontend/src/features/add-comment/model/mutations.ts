import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { putComment } from "../api/comment";
import { TPutCommentVariables } from "./types";
import { TComment } from "@/entities/comment/model/types";

export const usePutCommentMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: TComment, variables: TPutCommentVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPutCommentVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id, text, parent_comment_id }: TPutCommentVariables) => {
            return await putComment(comic_id, text, parent_comment_id);
        },
        onSuccess,
        onError
    });
}