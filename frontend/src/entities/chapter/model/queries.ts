import { useQuery } from "@tanstack/react-query";
import {
	getFirstChapter,
	getChapters,
	getChapter
} from "../api/chapter";
import { useGeneralInfiniteQuery } from "@/shared/lib";

export const useFirstChapter = (comic_id: string) => {
	return useQuery({
		queryKey: ["first_chapter", comic_id],
		queryFn: ({ signal }) => getFirstChapter(comic_id, signal),
	});
};

export const useComicChapters = (comic_id: string, initialEnabled: boolean) => {
	return useGeneralInfiniteQuery({
		queryKey: ["chapters", comic_id],
		queryFn: ({ pageParam = 0 }) => getChapters(comic_id, pageParam),
		initialEnabled: initialEnabled
	})
}

export const useChapter = (chapter_id: string) => {
	return useQuery({
		queryKey: ["chapter", chapter_id],
		queryFn: ({ signal }) => getChapter(chapter_id, signal),
	});
};