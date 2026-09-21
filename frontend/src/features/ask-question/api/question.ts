import { getApi } from "@/shared/api";
import { TCreateQuestionFormValues } from "../model/types";

export async function putQuestion(data: TCreateQuestionFormValues, signal?: AbortSignal) {
    return (await (await getApi()).put(`/api/feedback`,
        data,
        { signal }
    )).data;
}