import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { TCreateQuestionFormValues } from "./types";
import { putQuestion } from "../api/question";

export const usePutQuestionMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TCreateQuestionFormValues) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TCreateQuestionFormValues) => void 
}) => {
    return useMutation({
        mutationFn: async (createQuestionData: TCreateQuestionFormValues) => {
            return await putQuestion(createQuestionData);
        },
        onSuccess,
        onError
    });
}