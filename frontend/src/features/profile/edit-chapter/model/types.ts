import z from "zod";
import { editChapterSchema } from "./schema";

export type TEditChapterFormValues = z.infer<typeof editChapterSchema>;

export type TPatchChapterVariables = {
    chapter_id: string,
    editChapterData: FormData
}

export type TDeleteChapterVariables = {
    chapter_id: string,
}