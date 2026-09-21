import { useGeneralInfiniteQuery } from "@/shared/lib"
import { getComments } from "../api/comment"

export const useComicComments = (comic_id: string) => {
    return useGeneralInfiniteQuery({
        queryKey: ["comments", comic_id],
        queryFn: ({ pageParam = 0 }) => getComments(comic_id, pageParam),
        initialEnabled: false
    })
}