import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { TPatchChapterVariables } from "./types";
import { TDeleteChapterVariables } from "./types";
import { patchChapter } from "../api/edit";
import { deleteChapter } from "../api/edit";

export const usePatchChapterMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TPatchChapterVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPatchChapterVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ chapter_id, editChapterData }) => {
            return await patchChapter(chapter_id, editChapterData);
        },
        onSuccess,
        onError
    });
}

export const useDeleteChapterMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TDeleteChapterVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TDeleteChapterVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ chapter_id }) => {
            return await deleteChapter(chapter_id);
        },
        onSuccess,
        onError
    });
}