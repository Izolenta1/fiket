import { TComicFull } from "@/entities/comic/model/types"

export type TComicLikeVariables = {
    comic_transliterate_id: string
    type: string
}

export type TComicLikeContext = {
    previousComic?: TComicFull
}