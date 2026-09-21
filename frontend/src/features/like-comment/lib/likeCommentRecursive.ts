import { TComment } from "@/entities/comment/model/types";

export function likeCommentRecursive(comments: TComment[], like: boolean, targetId: string) {
    for (const comment of comments) {
        if (comment.id === targetId) {
            comment.liked = like
            comment.count_likes += like ? 1 : -1
            return true
        }

        if (comment.answers.length) {
            const added = likeCommentRecursive(comment.answers, like, targetId)
            if (added) return true
        }
    }

    return false;
}