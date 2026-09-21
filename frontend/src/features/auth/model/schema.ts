import { z } from "zod";

export const authSchema = z.object({
    username: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(128, "Максимум 128 символов"),
    password: z
        .string()
        .min(6, "Минимум 6 символов"),
});

export const registrationSchema = z.object({
    username: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(29, "Максимум 29 символов")
        .regex(/^[A-Za-z0-9_-]+$/, "Допустимы только латинские буквы, цифры, _ и -"),
    birthday: z
        .string({
            error: (iss) => iss.input === undefined ? "Поле даты рождения обязательно" : "Поле даты рождения должно быть строкой"
        })
        .min(1, "Дата рождения должна быть указана")
        .refine((value) => {
            const date = new Date(value);
            return date >= new Date("1920-01-01");
        }, "Дата должна быть позже 1920 года")
        .refine((value) => {
            const date = new Date(value);
            return date < new Date();
        }, "Дата не может быть в будущем"),
    email: z
        .email("Некорректный email"),
    password: z
        .string()
        .min(6, "Минимум 6 символов")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).+$/,
            "Пароль должен содержать строчные буквы, заглавные буквы, цифры и спецсимволы"
        ),
    password_repeat: z
        .string()
        .min(6, "Минимум 6 символов"),
    agreement: z
        .boolean()
        .refine((v) => v === true, {
            error: "Необходимо согласие пользовательского соглашения",
        }),
    politics: z
        .boolean()
        .refine((v) => v === true, {
            error: "Необходимо согласие политики обработки персональных данных",
        })
}).refine((data) => data.password === data.password_repeat, {
    message: "Пароли не совпадают",
    path: ["password_repeat"],
});

export const recoverySchema = z.object({
    email: z
        .email("Некорректный email")
})

export const resetPasswordSchema = z.object({
    token: z
        .string(),
    password: z
        .string()
        .min(6, "Минимум 6 символов")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).+$/,
            "Пароль должен содержать строчные буквы, заглавные буквы, цифры и спецсимволы"
        ),
    password_repeat: z
        .string()
        .min(6, "Минимум 6 символов"),
}).refine((data) => data.password === data.password_repeat, {
    message: "Пароли не совпадают",
    path: ["password_repeat"],
});