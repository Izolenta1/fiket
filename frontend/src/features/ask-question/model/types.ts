import z from "zod";
import { createQuestionSchema } from "./schema";

export type TCreateQuestionFormValues = z.infer<typeof createQuestionSchema>;