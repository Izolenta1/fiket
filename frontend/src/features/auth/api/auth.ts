import { getApi } from "@/shared/api";
import {
    TAuthFormValues,
    TRegistrationFormValues,
    TRecoveryFormValues,
    TResetPasswordFormValues
} from "../model/types";

export async function postAuth(data: TAuthFormValues, signal?: AbortSignal) {
    return (await (await getApi()).post(`/api/auth/token`,
        data, 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            signal
        }
    )).data;
}

export async function postRegistration(data: TRegistrationFormValues, signal?: AbortSignal) {
    return (await (await getApi()).post(`/api/auth/registration`,
        data, 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            signal
        }
    )).data;
}

export async function getVerify(token: string, signal?: AbortSignal) {
    return (await (await getApi()).get(`/api/auth/registration?token=${token}`,
        {
            signal
        }
    )).data;
}

export async function postRecovery(data: TRecoveryFormValues, signal?: AbortSignal) {
    return (await (await getApi()).post(`/api/auth/reset-password`,
        data, 
        {
            signal
        }
    )).data;
}

export async function patchResetPassword(data: TResetPasswordFormValues, signal?: AbortSignal) {
    return (await (await getApi()).patch(`/api/auth/reset-password-confirmation`,
        data, 
        {
            signal
        }
    )).data;
}

export async function postRefresh(signal?: AbortSignal) {
    return (await (await getApi()).post("/api/auth/refresh",
        {
            signal
        }
    )).data;
}

export async function postLogout(signal?: AbortSignal) {
    return (await (await getApi()).post("/api/auth/logout",
        {
            signal
        }
    )).data;
}