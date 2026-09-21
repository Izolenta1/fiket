import { useMutation } from "@tanstack/react-query";
import { patchComicLike } from "../api/like";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TComicLikeVariables,
    TComicLikeContext
} from "./types";

export const useComicLikeMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TComicLikeVariables) => TComicLikeContext | Promise<TComicLikeContext>,
    onSuccess?: (data: unknown, variables: TComicLikeVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TComicLikeVariables, context: TComicLikeContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_transliterate_id, type }: TComicLikeVariables) => {
            return await patchComicLike(comic_transliterate_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}