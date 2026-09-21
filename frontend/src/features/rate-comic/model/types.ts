export type TPersonalRatingResponse = {
    rating: number | null
}

export type TPatchRatingVariables = {
    comic_id: string;
    rating: number
}

export type TPatchRatingContext = {
    previousRating?: TPersonalRatingResponse
}

export type TDeleteRatingVariables = {
    comic_id: string;
}

export type TDeleteRatingContext = {
    previousRating?: TPersonalRatingResponse
}