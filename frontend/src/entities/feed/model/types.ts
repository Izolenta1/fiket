import { TWithPagination } from "@/shared/model";

export type TPost = {
    id: string,
    text: string,
    username: string,
    likes_count: number,
    views_count: number,
    created_at: string,
    liked: boolean,
    poll: TPoll,
    images_urls: string[]
}

export type TPoll = {
	id: string;
	choices: TChoice[];
}

type TChoice = {
	id: string;
	text: string;
	choice_count: number;
	chosen: boolean;
	number: number;
}

export type TPostsResponse = TWithPagination & {
    answer: TPost[];
}

export type TPostViewVariables = {
    post_id: string
}