import { z } from "zod";

export const createQuestionSchema = z.object({
    text: z
        .string()
        .min(10, "Минимум 10 символов")
        .max(2500, "Максимум 2500 символов"),
})