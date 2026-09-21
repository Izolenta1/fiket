import { z } from "zod";

export const editComicSchema = z.object({
    description: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(2000, "Максимум 2000 символов"),
    genre_ids: z
        .array(z.string())
        .min(2, "Необходимо выбрать минимум 2 жанра")
        .max(12, "Максимум 12 жанров"),
    age: z
        .enum(["0", "6", "12", "18"], "Значение возраста может быть только 0+, 6+, 12+, 18+"),
    poster: z
        .array(z.instanceof(File))
        .max(1, "Можно загрузить только один файл")
        .optional(),
    banner: z
        .array(z.instanceof(File))
        .max(1, "Можно загрузить только один файл")
        .optional(),
    comic_status: z
        .enum(["IN_PROGRESS", "EXCEPTED", "COMPLETED"], 'Статус комикса может быть только "Выходит", "Приостановлен" или "Вышел"'),
    cost_type: z
        .enum(["FREE", "PAID", "SUBSCRIPTION"], "Значение доступности может быть только общим или платным"),
    cost: z
        .string()
        .max(5, "Стоимость не может быть больше 99999 рублей")
        .optional(),
})
.superRefine((data, ctx) => {
    if (data.cost_type === "PAID" && !data.cost) {
        ctx.addIssue({
            path: ["cost"],
            code: "custom",
            message: "Для платного комикса необходимо указать стоимость",
        });
    }
});