'use client'

import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { TGlobalToast } from "@/shared/ui/toasts/global-toast/model/types";
import { TGlobalToastCreation } from "@/shared/ui/toasts/global-toast/model/types";

type TGlobalToastStore = {
    toasts: TGlobalToast[];
    createToast: (toast: TGlobalToastCreation) => void;
    deleteToast: (id: string) => void;
}

const GlobalToastContext = createContext<TGlobalToastStore | undefined>(undefined);

const GlobalToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<TGlobalToast[]>([]);

    const createToast = (toast: TGlobalToastCreation) => {
        setToasts(prev => [...prev, {id: toast.id ? toast.id : uuidv4(), ...toast}]);
    };

    const deleteToast = (id: string) => {
        setToasts(prev => prev.filter(item => item.id !== id));
    };

    return (
        <GlobalToastContext.Provider
        value={{ toasts, createToast, deleteToast }}
        >
            {children}
        </GlobalToastContext.Provider>
    );
}

export { GlobalToastProvider };

export function useGlobalToast() {
    const ctx = useContext(GlobalToastContext);
    if (ctx === undefined) {
        throw new Error("useGlobalToast must be used inside GlobalToastProvider");
    }
    return ctx;
}