import { useQuery } from "@tanstack/react-query";
import { getComicsByGenre } from "../api/comic";
import { getNovaComics } from "../api/comic";
import { getPopularComics } from "../api/comic";
import { getFullComic } from "../api/comic";
import { getComicSimilar } from "../api/comic";
import { useGeneralInfiniteQuery } from "@/shared/lib"
import { getFilter } from "../api/comic";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { getAuthorComics } from "../api/comic";

export const useNovaComics = () => {
	return useQuery({
		queryKey: ["nova"],
		queryFn: ({ signal }) => getNovaComics(signal),
	});
};

export const usePopularComics = () => {
	return useQuery({
		queryKey: ["popular"],
		queryFn: ({ signal }) => getPopularComics(signal),
	});
};

export const useComicsByGenre = (genre_id: string) => {
	return useQuery({
		queryKey: ["genre", genre_id],
		queryFn: ({ signal }) => getComicsByGenre(genre_id, signal),
	});
};

export const useFullComic = (comic_transliterate_id: string) => {
	return useQuery({
		queryKey: ["comic", comic_transliterate_id],
		queryFn: ({ signal }) => getFullComic(comic_transliterate_id, signal),
	});
};

export const useComicSimilar = (comic_id: string) => {
	return useQuery({
		queryKey: ["similar", comic_id],
		queryFn: ({ signal }) => getComicSimilar(comic_id, signal),
	});
};

export const useFilter = (searchParams: ReadonlyURLSearchParams) => {
	return useGeneralInfiniteQuery({
		queryKey: ["filter", searchParams.toString()],
		queryFn: ({ pageParam = 0 }) => getFilter(searchParams.toString(), pageParam),
		initialEnabled: true,
		offsetNumber: 20
	})
}

export const useAuthorComics = (username: string, paid_type: string) => {
	return useGeneralInfiniteQuery({
		queryKey: ["author_comics", username, paid_type],
		queryFn: ({ pageParam = 0 }) => getAuthorComics(username, paid_type, pageParam),
		initialEnabled: false,
	})
}