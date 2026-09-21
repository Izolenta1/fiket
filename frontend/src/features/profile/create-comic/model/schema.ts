import { z } from "zod";

export const createComicSchema = z.object({
    name: z
        .string()
        .min(2, "Минимум 2 символа")
        .max(100, "Максимум 100 символов"),
    description: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(2000, "Максимум 2000 символов"),
    genre_ids: z
        .array(z.string())
        .min(2, "Необходимо выбрать минимум 2 жанра")
        .max(12, "Максимум 12 жанров"),
    poster: z
        .array(z.instanceof(File))
        .min(1, "Необходимо добавить постер")
        .max(1, "Можно загрузить только один файл"),
    banner: z
        .array(z.instanceof(File))
        .min(1, "Необходимо добавить баннер")
        .max(1, "Можно загрузить только один файл"),
    comic_type: z
        .enum(["VERTICAL", "HORIZONTAL"], "Тип комикса может быть только вертикальным или горизонтальным"),
    age: z
        .enum(["0", "6", "12", "18"], "Значение возраста может быть только 0+, 6+, 12+, 18+"),
    publisher: z
        .string()
        .min(2, "Минимум 2 символа")
        .max(255, "Максимум 255 символов")
        .optional()
        .or(z.literal("")),
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