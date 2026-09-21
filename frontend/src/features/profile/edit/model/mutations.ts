import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { TErrorData } from "@/shared/model";
import {
    patchProfile,
    deleteProfile
} from "../api/edit";

export const usePatchProfileMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: FormData) => void,
    onError?: (error: AxiosError<TErrorData>, variables: FormData) => void 
}) => {
    return useMutation({
        mutationFn: async (editProfileData: FormData) => {
            return await patchProfile(editProfileData);
        },
        onSuccess,
        onError
    });
}

export const useDeleteProfileMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown) => void,
    onError?: (error: AxiosError<TErrorData>) => void 
}) => {
    return useMutation({
        mutationFn: async () => {
            return await deleteProfile();
        },
        onSuccess,
        onError
    });
}