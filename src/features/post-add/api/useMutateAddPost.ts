import { useMutation } from "@tanstack/react-query"
import { addPost } from "../../../entities/post/api"
import { Dispatch, SetStateAction } from "react"
import { usePostsStore } from "../../post/model/usePostsStore.ts"

interface UseAddPostMutationProps {
  setShowAddPostDialog: Dispatch<SetStateAction<boolean>>
}

export const useAddPostMutation = ({ setShowAddPostDialog }: UseAddPostMutationProps) => {
  const { addPosts } = usePostsStore((state) => state)

  return useMutation({
    mutationFn: (newPost: { title: string; body: string; userId: number }) => addPost(newPost),
    onSuccess: (data) => {
      addPosts(data)
      setShowAddPostDialog(false)
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })
}