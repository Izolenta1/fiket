import { useMutation } from "@tanstack/react-query";
import { postPayment } from "../api/buy";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TPaymentVariables,
    TPaymentResponse
} from "./types";

export const usePaymentMutation = ({
    onSuccess,
    onError 
}: {
    onSuccess?: (data: TPaymentResponse, variables: TPaymentVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPaymentVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id }: TPaymentVariables) => {
            return await postPayment(comic_id);
        },
        onSuccess,
        onError
    });
}