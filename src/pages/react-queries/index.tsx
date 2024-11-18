import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho người dùng và bài viết
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}

interface FormData {
  user: string;
  post: string;
}

// Hàm gọi API lấy danh sách người dùng
const fetchUsers = () => axios.get<User[]>("https://jsonplaceholder.typicode.com/users");

// Hàm gọi API lấy bài viết của một user
const fetchPostsByUser = (userId: string) =>
  axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

const App: React.FC = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      user: "",
      post: "",
    },
  });

  // Gọi API để lấy danh sách người dùng
  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Theo dõi giá trị `user`
  const selectedUserId = watch("user");

  // Gọi API để lấy bài viết của user bằng useQuery
  const { data: posts, isLoading: loadingPosts } = useQuery<Post[]>({
    queryKey: ["posts", selectedUserId], // Gắn key phụ thuộc vào `selectedUserId`
    queryFn: () => fetchPostsByUser(selectedUserId),
    enabled: !!selectedUserId, // Chỉ gọi API nếu `selectedUserId` tồn tại
    onSuccess: (res) => {
      // Reset giá trị form khi dữ liệu trả về
      reset((formValues) => ({
        ...formValues,
        post: res[0]?.id || "", // Đặt giá trị mặc định cho `post`
      }));
    },
  });

  // Hàm xử lý khi submit form
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  if (loadingUsers || (loadingPosts && selectedUserId)) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>React Query và React Hook Form - Quan hệ User và Post</h1>
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

        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default App;
