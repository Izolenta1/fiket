import z from "zod";
import { createPostSchema } from "./schema";

export type TCreatePostFormValues = z.infer<typeof createPostSchema>;