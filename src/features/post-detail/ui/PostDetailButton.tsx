import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { MessageSquare } from "lucide-react"
import { Post } from "../../../entities/post/model/types.ts"
import usePostQueryParams from "../../post/model/usePostURLParams.ts"
import { Dialog } from "../../../shared/ui/dialog/ui/Dialog.tsx"
import { DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/ui"
import { highlightText } from "../../../shared/lib/highlightText.tsx"
import { useState } from "react"
import CommentContent from "./CommentContent.tsx"

interface Props {
  post: Post
}

const PostDetailButton = ({ post }: Props) => {
  const { searchQuery } = usePostQueryParams()
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | undefined>()

  const openPostDetail = (post: Post) => {
    console.log(post, "pts")
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  console.log(selectedPost, "selectedPost")

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
        <MessageSquare className="w-4 h-4" />
      </Button>

      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            <CommentContent postId={post.id} />
            {/*{renderComments(selectedPost?.id)}*/}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostDetailButton