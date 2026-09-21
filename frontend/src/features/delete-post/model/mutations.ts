import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    TPostDeleteVariables,
    TPostDeleteContext
} from "./types";
import { deletePost } from "../api/delete";

export const useDeletePostMutation = ({
    onMutate,
    onSuccess,
    onError 
}: {
    onMutate?: (variables: TPostDeleteVariables) => TPostDeleteContext | Promise<TPostDeleteContext>,
    onSuccess?: (data: unknown, variables: TPostDeleteVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPostDeleteVariables, context: TPostDeleteContext | undefined) => void 
}) => {
    return useMutation({
        mutationFn: async ({ post_id }: TPostDeleteVariables) => {
            return await deletePost(post_id);
        },
        onMutate,
        onSuccess,
        onError
    });
}