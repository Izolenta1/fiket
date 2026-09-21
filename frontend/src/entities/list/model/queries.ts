import { useGeneralInfiniteQuery } from "@/shared/lib"
import { getUserList } from "../api/list"

export const useUserList = (username: string, category_id: string, list_mode: string) => {
    return useGeneralInfiniteQuery({
        queryKey: ["list", username, category_id],
        queryFn: ({ pageParam = 0 }) => getUserList(category_id, list_mode, pageParam),
        initialEnabled: false
    })
}