import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { patchComic } from "../api/edit";
import { deleteComic } from "../api/edit";
import { TPatchComicVariables } from "./types";
import { TDeleteComicVariables } from "./types";

export const usePatchComicMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TPatchComicVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPatchComicVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id, editComicData }) => {
            return await patchComic(comic_id, editComicData);
        },
        onSuccess,
        onError
    });
}

export const useDeleteComicMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TDeleteComicVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TDeleteComicVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ comic_id }) => {
            return await deleteComic(comic_id);
        },
        onSuccess,
        onError
    });
}