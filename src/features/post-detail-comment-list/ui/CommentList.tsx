import { useQueryCommentList } from "../api/useQueryCommentList.ts"
import { highlightText } from "../../../shared/lib/highlightText.tsx"
import CommentLikeButton from "../../post-detail-comment-like/ui/CommentLikeButton.tsx"
import CommentEditButton from "../../post-detail-comment-edit/ui/CommentEditButton.tsx"
import CommentDeleteButton from "../../post-detail-comment-delete/ui/CommentDeleteButton.tsx"
import { useCommentStore } from "../../../entities/comment/model/store.ts"

const CommentList = () => {
  const params = new URLSearchParams(location.search)
  const searchQuery = params.get("searchQuery") as string
  const { postId, comments } = useCommentStore((state) => state)
  const { isLoading } = useQueryCommentList()

  if (isLoading || !comments) return null

  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CommentLikeButton comment={comment} postId={postId} />
            <CommentEditButton comment={comment} />
            <CommentDeleteButton comment={comment} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList
