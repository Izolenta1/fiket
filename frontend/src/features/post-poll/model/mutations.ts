import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TPostVariantVariables,
    TPostVariantContext
} from "./types";
import { putPostVariant } from "../api/poll";

export const usePutPostVariantMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TPostVariantVariables) => TPostVariantContext | Promise<TPostVariantContext>,
    onSuccess?: (data: unknown, variables: TPostVariantVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPostVariantVariables, context: TPostVariantContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ variant_id }: TPostVariantVariables) => {
            return await putPostVariant(variant_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}