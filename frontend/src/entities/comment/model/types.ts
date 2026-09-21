import { TWithPagination } from "@/shared/model";

export type TComment = {
	id: string;
	nickname: string;
	username: string;
	text: string
	count_likes: number;
	liked: boolean;
	created_at: string;
	is_author: boolean;
	ava_url: string;
	answers: TComment[];
}

export type TCommentsResponse = TWithPagination & {
    answer: TComment[]
}