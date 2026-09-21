import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../api/search";

export const useSearch = (debouncedSearch: string) => {
	return useQuery({
        queryKey: ["search", debouncedSearch],
        queryFn: () => getSearch(debouncedSearch),
        enabled: debouncedSearch.length >= 3
	});
};