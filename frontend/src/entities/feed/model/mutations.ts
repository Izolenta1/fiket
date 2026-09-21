import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import { TPostViewVariables } from "./types";
import { patchPostView } from "../api/feed";

export const usePatchPostViewMutation = ({
    onSuccess,
    onError 
}: {
    onSuccess?: (data: unknown, variables: TPostViewVariables) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TPostViewVariables) => void 
}) => {
    return useMutation({
        mutationFn: async ({ post_id }: TPostViewVariables) => {
            return await patchPostView(post_id);
        },
        onSuccess,
        onError
    });
}