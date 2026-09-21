import z from "zod";
import { createChapterSchema } from "./schema";

export type TCreateChapterFormValues = z.infer<typeof createChapterSchema>;