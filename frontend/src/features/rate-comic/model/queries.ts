import { useQuery } from "@tanstack/react-query";
import { getPersonalRating } from "../api/rating";

export const usePersonalRating = (enabled: boolean, comic_id: string) => {
	return useQuery({
		queryKey: ["personal_rating", comic_id],
		queryFn: ({ signal }) => getPersonalRating(comic_id, signal),
        enabled: enabled
	});
};