import z from "zod";
import { editComicSchema } from "./schema";

export type TEditComicFormValues = z.infer<typeof editComicSchema>;

export type TPatchComicVariables = {
    comic_id: string,
    editComicData: FormData
}

export type TDeleteComicVariables = {
    comic_id: string,
}