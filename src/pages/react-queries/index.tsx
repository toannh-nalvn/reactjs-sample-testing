import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

type Error = {
  message: string;
};

// Hàm gọi API lấy danh sách người dùng
const fetchUsers = async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data; // Chỉ trả về dữ liệu
};
// Hàm gọi API lấy bài viết của một user
const fetchPostsByUser = async (userId: string): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return response.data; // Chỉ trả về dữ liệu
};

const ReactQueries = () => {
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

  // Gọi `useQuery` với kiểu đầy đủ
  const queryOptions: UseQueryOptions<Post[], Error, Post[], QueryKey> = {
    queryKey: ["posts", selectedUserId],
    queryFn: () =>
      selectedUserId ? fetchPostsByUser(selectedUserId) : Promise.resolve([]),
    enabled: !!selectedUserId,
  };

  const { data: posts, isLoading: loadingPosts } = useQuery(queryOptions);

  useEffect(() => {
    console.log('posts', posts);
    if (posts?.length) {
      reset({
        ...watch(),
        post: posts[0]?.id?.toString() || "",
      });
    }
  }, [posts, reset, watch]);

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

export default ReactQueries;
