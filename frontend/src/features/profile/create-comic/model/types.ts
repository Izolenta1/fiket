import z from "zod";
import { createComicSchema } from "./schema";

export type TCreateComicFormValues = z.infer<typeof createComicSchema>;