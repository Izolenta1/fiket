import { z } from "zod";

export const profileEditSchema = z.object({
    nickname: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(29, "Максимум 29 символов")
        .regex(/^[A-Za-zА-Яа-яЁё0-9_ -]+$/, "Допустимы только латинские буквы, кириллица, цифры, _ и -"),
    ava: z
        .array(z.instanceof(File))
        .max(1, "Можно загрузить только один файл")
        .optional(),
    background: z
        .array(z.instanceof(File))
        .max(1, "Можно загрузить только один файл")
        .optional(),
    about: z
        .string()
        .max(2500, "Максимум 2500 символов")
        .optional(),
    youtube: z
        .url({ error: "Некорректный url для youtube" })
        .optional()
        .or(z.literal("")),
    vk: z
        .url({ error: "Некорректный url для vk" })
        .optional()
        .or(z.literal("")),
    tg: z
        .url({ error: "Некорректный url для tg" })
        .optional()
        .or(z.literal("")),
    email: z
        .email({ error: "Некорректный адрес для почты" })
        .optional()
        .or(z.literal("")),
    pinterest: z
        .url({ error: "Некорректный url для pinterest" })
        .optional()
        .or(z.literal("")),
    dzen: z
        .url({ error: "Некорректный url для dzen" })
        .optional()
        .or(z.literal("")),
});