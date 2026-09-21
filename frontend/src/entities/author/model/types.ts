import { TPagination } from "@/shared/model";

export type TAuthorShort = {
    id: string;
    username: string;
    nickname: string;
    ava_url: string
}

export type TAuthorsResponse = {
    answer: TAuthorShort[]
    pagination: TPagination
}