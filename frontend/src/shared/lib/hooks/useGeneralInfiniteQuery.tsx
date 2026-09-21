'use client'

import {
    useInfiniteQuery,
    type QueryFunction
} from "@tanstack/react-query";
import { type TWithPagination } from "@/shared/model";
import { useInView } from 'react-intersection-observer'
import { useState } from "react";

export function useGeneralInfiniteQuery<T extends TWithPagination>({ queryKey, queryFn, initialEnabled, offsetNumber = 10 }: TUseGeneralInfiniteQuery<T>) {
    const [enabled, setEnabled] = useState(initialEnabled)
	
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
		queryKey,
		queryFn,
		enabled,
		refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (!lastPage.pagination.has_next_page) {
				return undefined;
			}
			return lastPageParam + offsetNumber;
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
				fetchNextPage()
			}
		},
	})

    return { data, isLoading, hasNextPage, refetch, ref, enabled }
}

type TUseGeneralInfiniteQuery<T> = {
    queryKey: string[],
    queryFn: QueryFunction<T, string[], number>;
	initialEnabled: boolean,
	offsetNumber?: number
}