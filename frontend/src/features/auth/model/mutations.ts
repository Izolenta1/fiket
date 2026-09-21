import { useMutation } from "@tanstack/react-query";
import {
    postAuth,
    postRegistration,
    getVerify,
    postRecovery,
    patchResetPassword,
    postRefresh,
    postLogout
} from "../api/auth";
import {
    TAuthFormValues,
    TRegistrationFormValues,
    TRecoveryFormValues,
    TResetPasswordFormValues
} from "./types";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";

export const useAuthMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TAuthFormValues) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TAuthFormValues) => void 
}) => {
    return useMutation({
        mutationFn: async (authData: TAuthFormValues) => {
            return await postAuth(authData);
        },
        onSuccess,
        onError
    });
}

export const useRegistrationMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TRegistrationFormValues) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TRegistrationFormValues) => void 
}) => {
    return useMutation({
        mutationFn: async (registrationData: TRegistrationFormValues) => {
            return await postRegistration(registrationData);
        },
        onSuccess,
        onError
    });
}

export const useVerifyMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: string) => void,
    onError?: (error: AxiosError<TErrorData>, variables: string) => void 
}) => {
    return useMutation({
        mutationFn: async (token: string) => {
            return await getVerify(token);
        },
        onSuccess,
        onError
    });
}

export const useRecoveryMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TRecoveryFormValues) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TRecoveryFormValues) => void 
}) => {
    return useMutation({
        mutationFn: async (recoveryData: TRecoveryFormValues) => {
            return await postRecovery(recoveryData);
        },
        onSuccess,
        onError
    });
}

export const useResetPasswordMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown, variables: TResetPasswordFormValues) => void,
    onError?: (error: AxiosError<TErrorData>, variables: TResetPasswordFormValues) => void 
}) => {
    return useMutation({
        mutationFn: async (resetPasswordData: TResetPasswordFormValues) => {
            return await patchResetPassword(resetPasswordData);
        },
        onSuccess,
        onError
    });
}

export const useRefreshMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown) => void,
    onError?: (error: AxiosError<TErrorData>) => void 
}) => {
    return useMutation({
        mutationFn: async () => {
            return await postRefresh();
        },
        onSuccess,
        onError
    });
}

export const useLogoutMutation = ({ 
    onSuccess,
    onError 
}: { 
    onSuccess?: (data: unknown) => void,
    onError?: (error: AxiosError<TErrorData>) => void 
}) => {
    return useMutation({
        mutationFn: async () => {
            return await postLogout();
        },
        onSuccess,
        onError
    });
}