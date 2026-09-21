import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { putChapter } from "../api/chapter";

export const usePutChapterMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: FormData) => void,
    onError?: (error: AxiosError<TErrorData>, variables: FormData) => void 
}) => {
    return useMutation({
        mutationFn: async (newChapterData: FormData) => {
            return await putChapter(newChapterData);
        },
        onSuccess,
        onError
    });
}