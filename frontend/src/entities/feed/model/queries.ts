import { useGeneralInfiniteQuery } from "@/shared/lib"
import { getPosts } from "../api/feed"

export const usePosts = (username: string) => {
    return useGeneralInfiniteQuery({
        queryKey: ["posts", username],
        queryFn: ({ pageParam = 0 }) => getPosts(username, pageParam),
        initialEnabled: false
    })
}