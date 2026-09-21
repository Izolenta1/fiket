import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TPostLikeVariables,
    TPostLikeContext
} from "./types";
import { putPostLike } from "../api/like";
import { deletePostLike } from "../api/like";

export const usePutPostLikeMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TPostLikeVariables) => TPostLikeContext | Promise<TPostLikeContext>,
    onSuccess?: (data: unknown, variables: TPostLikeVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPostLikeVariables, context: TPostLikeContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ post_id }: TPostLikeVariables) => {
            return await putPostLike(post_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}

export const useDeletePostLikeMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TPostLikeVariables) => TPostLikeContext | Promise<TPostLikeContext>,
    onSuccess?: (data: unknown, variables: TPostLikeVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPostLikeVariables, context: TPostLikeContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ post_id }: TPostLikeVariables) => {
            return await deletePostLike(post_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}