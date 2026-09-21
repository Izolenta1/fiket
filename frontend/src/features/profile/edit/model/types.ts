import z from "zod";
import { profileEditSchema } from "./schema";

export type TProfileEditFormValues = z.infer<typeof profileEditSchema>;