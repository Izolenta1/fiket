import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { putPost } from "../api/create";

export const usePutPostMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: FormData) => void,
    onError?: (error: AxiosError<TErrorData>, variables: FormData) => void 
}) => {
    return useMutation({
        mutationFn: async (createPostData: FormData) => {
            return await putPost(createPostData);
        },
        onSuccess,
        onError
    });
}