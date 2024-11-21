import { useEffect } from "react";

import { FormData } from "../types";
import { Comment } from "./useFetchCommentsByPost";

const useSetFirstComment = (
  comments: Comment[] | undefined,
  setValue: (name: keyof FormData, value: string[]) => void
) => {
  useEffect(() => {
    if (comments?.length) {
      setValue("comment", [
        comments[0].id.toString(),
        comments[1].id.toString(),
      ]); // Gán bình luận đầu tiên
    } else {
      setValue("comment", [""]); // Xóa giá trị nếu không có bình luận
    }
  }, [comments, setValue]);
};

export default useSetFirstComment;