import { z } from "zod";

export const createChapterSchema = z.object({
    comic_id: z
        .string(),
    name: z
        .string()
        .min(2, "Минимум 2 символа")
        .max(100, "Максимум 100 символов"),
    poster: z
        .array(z.instanceof(File))
        .min(1, "Необходимо добавить постер")
        .max(1, "Можно загрузить только один файл"),
    pages: z
        .array(z.instanceof(File))
        .min(1, "Необходимо добавить файл со страницами")
        .max(1, "Можно загрузить только один файл"),
});