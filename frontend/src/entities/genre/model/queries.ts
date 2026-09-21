import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/genre";

export const useGenres = () => {
	return useQuery({
		queryKey: ["genres"],
		queryFn: ({ signal }) => getGenres(signal),
	});
};