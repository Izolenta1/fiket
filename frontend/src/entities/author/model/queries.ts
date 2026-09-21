import { useQuery } from "@tanstack/react-query";
import { getIndexAuthors } from "../api/author";

export const useIndexAuthors = () => {
	return useQuery({
		queryKey: ["home", "authors"],
		queryFn: ({ signal }) => getIndexAuthors(signal),
	});
};