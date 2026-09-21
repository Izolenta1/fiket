import { useMutation } from "@tanstack/react-query";
import {
    putPersonalList,
    deletePersonalList
} from "../api/list";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TPutPersonalListVariables,
    TPutPersonalListContext,
    TDeletePersonalListVariables,
    TDeletePersonalListContext
} from "./types";

export const usePutPersonalListMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TPutPersonalListVariables) => TPutPersonalListContext | Promise<TPutPersonalListContext>,
    onSuccess?: (data: unknown, variables: TPutPersonalListVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPutPersonalListVariables, context: TPutPersonalListContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id, category_id }: TPutPersonalListVariables) => {
            return await putPersonalList(comic_id, category_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}

export const useDeletePersonalListMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TDeletePersonalListVariables) => TDeletePersonalListContext | Promise<TDeletePersonalListContext>,
    onSuccess?: (data: unknown, variables: TDeletePersonalListVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TDeletePersonalListVariables, context: TDeletePersonalListContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id, category_id }: TDeletePersonalListVariables) => {
            return await deletePersonalList(comic_id, category_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}