import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";

import { useFetchCommentsByPost, useFetchPostsByUser, useFetchUsers, useSetFirstComment, useSetFirstPost, useSetFirstUser } from "./hooks";
import { FormData } from "./types";

const ReactQueries = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      user: "",
      post: "",
      comment: [""],
    },
  });

  const { data: users, isLoading: loadingUsers } = useFetchUsers();
  const selectedUserId = watch("user");

  const { data: posts, isLoading: loadingPosts } =
    useFetchPostsByUser(selectedUserId);
  const selectedPostId = watch("post");

  const { data: comments, isLoading: loadingComments } =
    useFetchCommentsByPost(selectedPostId);

  // Sử dụng custom hooks
  useSetFirstUser(users, setValue);
  useSetFirstPost(posts, setValue);
  useSetFirstComment(comments, setValue);

  // Hàm xử lý khi submit form
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  if (
    loadingUsers ||
    (loadingPosts && selectedUserId) ||
    (loadingComments && selectedPostId)
  ) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        React Query và React Hook Form - Quan hệ User Post, và Comments
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Select User */}
        <div>
          <label>Người dùng:</label>
          <select {...register("user")}>
            <option value="">Chọn người dùng</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Post */}
        <div>
          <label>Bài viết:</label>
          <select {...register("post")}>
            <option value="">Chọn bài viết</option>
            {posts?.map((post) => (
              <option key={post.id} value={post.id.toString()}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        {/* Select Comment */}
        <div>
          <label>Bình luận:</label>
          <select {...register("comment")} multiple>
            <option value="">Chọn bình luận</option>
            {comments?.map((comment) => (
              <option key={comment.id} value={comment.id.toString()}>
                {comment.body}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default ReactQueries;
