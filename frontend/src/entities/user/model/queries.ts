import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";

export const useUserQuery = (username: string) => {
	return useQuery({
		queryKey: ["profile", username],
		queryFn: ({ signal }) => getUser(username, signal),
		gcTime: Infinity
	});
};