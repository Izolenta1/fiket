import { TComment } from "@/entities/comment/model/types";

export function addCommentRecursive(comments: TComment[], newComment: TComment, targetId: string) {
	for (const comment of comments) {
		if (comment.id === targetId) {
			comment.answers.push(newComment);
			return true;
		}

		if (comment.answers.length) {
			const added = addCommentRecursive(comment.answers, newComment, targetId);
			if (added) return true;
		}
	}

	return false;
}
