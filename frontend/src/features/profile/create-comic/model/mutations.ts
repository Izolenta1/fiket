import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { putComic } from "../api/create";

export const usePutComicMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: FormData) => void,
    onError?: (error: AxiosError<TErrorData>, variables: FormData) => void 
}) => {
    return useMutation({
        mutationFn: async (createComicData: FormData) => {
            return await putComic(createComicData);
        },
        onSuccess,
        onError
    });
}