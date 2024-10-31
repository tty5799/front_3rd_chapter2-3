import { useMutation } from "@tanstack/react-query"
import { Dispatch } from "react"
import { editPost } from "../../../entities/post/api"
import { Post } from "../../../entities/post/model/types.ts"
import { usePostsStore } from "../../post/model/usePostsStore.ts"

interface Props {
  setShowEditPostDialog: Dispatch<React.SetStateAction<boolean>>
}

export const useMutateEditPost = ({ setShowEditPostDialog }: Props) => {
  const { editPosts } = usePostsStore((state) => state)

  return useMutation({
    mutationFn: ({ postId, post }: { postId: number; post: Post }) => editPost(postId, post),
    onSuccess: (data) => {
      editPosts(data)
      setShowEditPostDialog(false)
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}