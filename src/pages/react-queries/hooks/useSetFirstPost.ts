import { useEffect } from "react";
import { FormData } from "../types";
import { Post } from "./fetchPostsByUser";

export const useSetFirstPost = (
  posts: Post[] | undefined,
  setValue: (name: keyof FormData, value: string) => void
) => {
  useEffect(() => {
    if (posts?.length) {
      setValue("post", posts[0].id.toString()); // Gán bài viết đầu tiên
    } else {
      setValue("post", ""); // Xóa giá trị nếu không có bài viết
    }
  }, [posts, setValue]);
};
