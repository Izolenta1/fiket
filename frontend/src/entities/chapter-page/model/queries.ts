'use client'

import {
    useQuery,
    useInfiniteQuery,
	type InfiniteData
} from "@tanstack/react-query";
import { getPage } from "../api/page";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { TPageResponse } from "./types";
import type { AxiosError } from "axios";
import { TErrorData } from "@/shared/model";

export const useHorizontalPage = (chapter_id: string, page: number) => {
	return useQuery<TPageResponse, AxiosError<TErrorData>>({
		queryKey: ["page", chapter_id, page],
		queryFn: ({ signal }) => getPage(chapter_id, page, signal),
        staleTime: 15 * 1000, // 15 секунд
        retry: false,
	});
};

export const usePrepareHorizontalPage = (chapter_id: string, page: number, page_limit: number) => {
	return useQuery<TPageResponse, AxiosError<TErrorData>>({
		queryKey: ["page", chapter_id, page + 1],
		queryFn: ({ signal }) => getPage(chapter_id, page + 1, signal),
        enabled: page + 1 < page_limit,
        staleTime: 15 * 1000, // 15 секунд
        retry: false,
	});
};

export const useVerticalPages = (chapter_id: string, page: number, page_limit: number, setPage: React.Dispatch<React.SetStateAction<number>>) => {
    const [enabled, setEnabled] = useState(true)
	
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, error } = useInfiniteQuery<TPageResponse, AxiosError<TErrorData>, InfiniteData<TPageResponse>, ["page", string], number>({
		queryKey: ["page", chapter_id],
		queryFn: ({ pageParam = 0 }) => getPage(chapter_id, pageParam),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 15 * 1000, // 15 секунд
        retry: false,
        initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (page + 1 === page_limit) {
				return undefined;
			}
			return lastPageParam + 1;
		},
	})

	const { ref } = useInView({
		threshold: 0.1,
		onChange: (inView) => {
			if (!enabled) {
				setEnabled(true)
				return
			}

			if (inView && hasNextPage && !isFetchingNextPage) {
				setPage(prev => prev + 1)
				fetchNextPage()
			}
		},
	})

    return { data, isLoading, hasNextPage, isFetchingNextPage, ref, error }
}