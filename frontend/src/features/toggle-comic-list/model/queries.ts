import { useQuery } from "@tanstack/react-query";
import { getPersonalLists } from "../api/list";

export const usePersonalLists = (enabled: boolean, comic_id: string) => {
	return useQuery({
		queryKey: ["personal_lists", comic_id],
		queryFn: ({ signal }) => getPersonalLists(comic_id, signal),
        enabled: enabled
	});
};