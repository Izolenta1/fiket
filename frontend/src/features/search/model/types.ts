import { TComicShort } from "@/entities/comic/model/types"
import { TAuthorShort } from "@/entities/author/model/types"

export type TSearchData = {
    comics: TComicShort[]
    authors: TAuthorShort[]
}