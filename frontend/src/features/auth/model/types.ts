import z from "zod";
import { authSchema } from "./schema";
import { registrationSchema } from "./schema";
import { recoverySchema } from "./schema";
import { resetPasswordSchema } from "./schema";

export type TAuthFormValues = z.infer<typeof authSchema>;
export type TRegistrationFormValues = z.infer<typeof registrationSchema>;
export type TRecoveryFormValues = z.infer<typeof recoverySchema>;
export type TResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;