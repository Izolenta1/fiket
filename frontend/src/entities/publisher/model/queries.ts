import { useQuery } from "@tanstack/react-query";
import { getPublishers } from "../api/publisher";

export const usePublishers = () => {
	return useQuery({
		queryKey: ["publishers"],
		queryFn: ({ signal }) => getPublishers(signal),
	});
};