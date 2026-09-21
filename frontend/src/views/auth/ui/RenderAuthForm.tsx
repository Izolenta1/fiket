'use client'

import { AuthForm } from "@/features/auth";
import { RegistrationForm } from "@/features/auth";
import { RecoveryForm } from "@/features/auth";

const RenderAuthForm = (selectedContent: string) => {
    switch (selectedContent) {
        case "Auth":
            return <AuthForm />;
        case "Registration":
            return <RegistrationForm />;
        case "Recovery":
            return <RecoveryForm />;
        default:
            return null
    }
};

export { RenderAuthForm }