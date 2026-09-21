import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    putCommentLike,
    deleteCommentLike
} from "../api/like";
import {
    TCommentLikeVariables,
    TCommentLikeContext
} from "./types";

export const usePutCommentLikeMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TCommentLikeVariables) => TCommentLikeContext | Promise<TCommentLikeContext>,
    onSuccess?: (data: unknown, variables: TCommentLikeVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TCommentLikeVariables, context: TCommentLikeContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comment_id }: TCommentLikeVariables) => {
            return await putCommentLike(comment_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}

export const useDeleteCommentLikeMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TCommentLikeVariables) => TCommentLikeContext | Promise<TCommentLikeContext>,
    onSuccess?: (data: unknown, variables: TCommentLikeVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TCommentLikeVariables, context: TCommentLikeContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comment_id }: TCommentLikeVariables) => {
            return await deleteCommentLike(comment_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}