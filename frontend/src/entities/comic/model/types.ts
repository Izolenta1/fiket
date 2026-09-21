import { TWithPagination } from "@/shared/model";
import { TAuthorShort } from "@/entities/author/model/types";
import { TGenre } from "@/entities/genre/model/types";

export type TComicShort = {
    id: string;
    name: string;
    transliterate_name: string;
    status: "COMPLETED" | "IN_PROGRESS" | "EXCEPTED";
    views: number;
    rating: number | null;
    created_at: string;
    poster_url: string;
    banner_url: string;
}

export type TComicFull = {
	id: string;
	name: string;
	description: string | null;
	read_type: "VERTICAL" | "HORIZONTAL";
	status: "COMPLETED" | "IN_PROGRESS" | "EXCEPTED";
	cost_type: "FREE" | "SUBSCRIPTION" | "PAID";
	age_rating: 0 | 6 | 12 | 18;
	views: number;
	likes_count: number,
	liked: boolean,
	cost: number | null;
	rating: number;
	banner_url: string;
	poster_url: string;
	genres: TGenre[];
	publisher: string | null;
	purchased: boolean;
	age_pass: boolean;
	author: TAuthorShort;
}

export type TFilterResponse = TWithPagination & {
    answer: TComicShort[]
}

export type TSimilarResponse = TWithPagination & {
    answer: TComicShort[]
}