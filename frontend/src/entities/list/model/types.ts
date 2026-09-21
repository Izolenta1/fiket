import { TWithPagination } from "@/shared/model";
import { TComicShort } from "@/entities/comic/model/types";

export type TListResponse = TWithPagination & {
    answer: TComicShort[];
}