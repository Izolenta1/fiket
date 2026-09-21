import { TWithPagination } from "@/shared/model";

export type TChapter = {
	id: string;
	name: string;
	number: number;
	views: number;
	created_at: string;
	poster_url: string;
}

export type TChaptersResponse = TWithPagination & {
	answer: {
		chapters: TChapter[];
		purchased: boolean;
		age_pass: boolean;
	}
}

export type TChapterReader = {
	chapter_name: string;
	chapter_number: number;
	comic_name: string;
	comic_type: string;
	pages_count: number;
	previous_id: string | null;
	next_id: string | null;
}