import { z } from "zod";

export const createPostSchema = z.object({
    text: z
        .string()
        .min(10, "Минимум 10 символов")
        .max(2500, "Максимум 2500 символов"),
    images: z
        .array(z.instanceof(File))
        .max(6, "Можно загрузить до 6 файлов")
        .optional(),
    poll: z
        .array(z.string().max(100, "Строка не должна превышать 100 символов"))
        .max(10, "Максимум 10 выборов в опросе")
        .optional(),
});