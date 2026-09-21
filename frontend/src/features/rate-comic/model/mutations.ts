import { useMutation } from "@tanstack/react-query";
import {
    patchPersonalRating,
    deletePersonalRating
} from "../api/rating";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TPatchRatingVariables,
    TPatchRatingContext,
    TDeleteRatingVariables,
    TDeleteRatingContext
} from "./types";

export const usePatchRatingMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TPatchRatingVariables) => TPatchRatingContext | Promise<TPatchRatingContext>,
    onSuccess?: (data: unknown, variables: TPatchRatingVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPatchRatingVariables, context: TPatchRatingContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id, rating }: TPatchRatingVariables) => {
            return await patchPersonalRating(comic_id, rating);
        },
        onMutate,
        onSuccess,
        onError
    });
}

export const useDeleteRatingMutation = ({ 
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TDeleteRatingVariables) => TDeleteRatingContext | Promise<TDeleteRatingContext>,
    onSuccess?: (data: unknown, variables: TDeleteRatingVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TDeleteRatingVariables, context: TDeleteRatingContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id }: TDeleteRatingVariables) => {
            return await deletePersonalRating(comic_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}