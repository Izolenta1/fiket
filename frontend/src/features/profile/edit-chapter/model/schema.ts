import { z } from "zod";

export const editChapterSchema = z.object({
    name: z
        .string()
        .min(2, "Минимум 2 символа")
        .max(100, "Максимум 100 символов"),
    poster: z
        .array(z.instanceof(File))
        .max(1, "Можно загрузить только один файл")
        .optional(),
    pages: z
        .array(z.instanceof(File))
        .max(1, "Можно загрузить только один файл")
        .optional(),
});