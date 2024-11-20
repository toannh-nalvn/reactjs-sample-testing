Trong bài viết này, chúng ta sẽ khám phá cách kết hợp React Query, React Hook Form, và Custom Hooks để xây dựng một giải pháp quản lý dữ liệu hiệu quả và dễ dàng. Bằng cách sử dụng React Query để xử lý việc gọi API và quản lý trạng thái của dữ liệu từ các nguồn bên ngoài, kết hợp với React Hook Form để tạo ra các biểu mẫu mạnh mẽ và dễ dàng xác thực, bạn sẽ có một công cụ mạnh mẽ để xây dựng các ứng dụng web phức tạp. Đồng thời, chúng ta sẽ tìm hiểu cách tạo ra các Custom Hooks để tái sử dụng logic và tối ưu hóa mã nguồn, giúp ứng dụng trở nên sạch sẽ và dễ bảo trì hơn.

Hãy cùng đi vào chi tiết cách kết hợp các thư viện này để tạo ra một ứng dụng quản lý thông minh, dễ sử dụng và dễ mở rộng.

### Cài đặt các thư viện
Trước khi bắt đầu, bạn cần cài đặt các thư viện cần thiết:

```bash
npm install react-query react-hook-form axios
```
1. React Query: Thư viện giúp quản lý và cache dữ liệu từ API.
1. React Hook Form: Thư viện giúp xây dựng biểu mẫu (form) dễ dàng và quản lý các giá trị của biểu mẫu.
1. Axios: Thư viện HTTP client để gọi API.

### Định nghĩa kiểu dữ liệu
Trước khi sử dụng React Hook Form và React Query, chúng ta cần định nghĩa kiểu dữ liệu cho các đối tượng sẽ xử lý, bao gồm người dùng và bài viết.

```tsx
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

interface FormData {
  user: string;
  post: string;
  comment: string[];
}
```
Chúng ta sử dụng các interface trong TypeScript để đảm bảo rằng các giá trị dữ liệu sẽ có kiểu chính xác khi xử lý.

### Gọi API với React Query
Chúng ta sẽ sử dụng useQuery từ React Query để gọi API lấy danh sách người dùng và bài viết của người dùng đó.

```tsx
const fetchPostsByUser = async (userId: string): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return response.data;
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

const fetchCommentsByPost = async (postId: string): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.data;
};
	```
	
Ở đây, chúng ta có hai hàm API:

* fetchUsers: Lấy danh sách người dùng.
* fetchPostsByUser: Lấy bài viết của người dùng dựa trên userId.
* fetchCommentsByPost: Lấy comment của bài viết dựa trên postId.

### Tạo form với React Hook Form
Bây giờ, chúng ta sẽ tạo một biểu mẫu để người dùng có thể chọn một người dùng và bài viết. Biểu mẫu này sẽ được quản lý bởi React Hook Form.

```tsx
const { register, handleSubmit, watch, setValue } = useForm<FormData>({
  defaultValues: {
    user: "",
    post: "",
  },
});
```
* register: Dùng để đăng ký các input trong form.
* handleSubmit: Xử lý khi submit form.
* setValue: Được dùng để thiết lập lại giá trị của form sau khi lấy dữ liệu từ API.
* watch: Theo dõi giá trị của các trường trong form.

### Xử lý user mặc định
Mặc định, khi tải trang sẽ tiến hành chọn người dùng đầu tiên khi có dữ liệu trong form.
```tsx
export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 300000, // 5 phút
  });
};

export const useSetFirstUser = (
  users: User[] | undefined,
  setValue: (name: keyof FormData, value: string) => void
) => {
  useEffect(() => {
    if (users?.length) {
      setValue("user", users[0].id.toString()); // Gán user đầu tiên
    }
  }, [users, setValue]);
};
```

* staleTime: Cài đặt thời gian làm mới API.
* setValue: Khi API trả về thành công, chúng ta sử dụng setValue để thiết lập giá trị mặc định cho user mặc định.

### Xử lý khi người dùng chọn user
Khi người dùng chọn một người dùng từ danh sách user, chúng ta sẽ gọi API để lấy các bài viết của người dùng đó. Sau khi dữ liệu bài viết được trả về, chúng ta sẽ cập nhật giá trị mặc định cho trường bài viết trong form.
```tsx
export const useFetchPostsByUser = (userId: string) => {
  return useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
    enabled: !!userId,
    staleTime: 300000, // 5 phút
  });
};

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

```

* enabled: !!userId: Điều này đảm bảo rằng API chỉ được gọi khi người dùng đã chọn một người dùng.
* useSetFirstPost: Khi API trả về thành công, chúng ta sử dụng setValue để thiết lập giá trị mặc định cho bài viết đầu tiên.

### Xử lý khi người dùng chọn comment
Khi người dùng chọn một post từ danh sách post, chúng ta sẽ gọi API để lấy các comment của bài viết đó. Sau khi dữ liệu comment được trả về, chúng ta sẽ cập nhật giá trị mặc định cho trường comment trong form.
```tsx
export const useFetchCommentsByPost = (postId: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPost(postId),
    enabled: !!postId,
    staleTime: 300000, // 5 phút
  });
};

export const useSetFirstComment = (
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
```

* enabled: !!postId: Điều này đảm bảo rằng API chỉ được gọi khi người dùng đã chọn một bài viết.
* useSetFirstComment: Khi API trả về thành công, chúng ta sử dụng setValue để thiết lập giá trị mặc định cho 2 comments đầu tiên.

### Khi người dùng gửi biểu mẫu, chúng ta sẽ xử lý dữ liệu của form
```tsx
const onSubmit: SubmitHandler<FormData> = (data) => {
  console.log("Form Data:", data);
};
```
Trong hàm onSubmit, bạn có thể xử lý dữ liệu từ form (ví dụ: gửi đến một API khác hoặc làm một cái gì đó với dữ liệu).

### Hiển thị biểu mẫu
Cuối cùng, chúng ta sẽ hiển thị biểu mẫu và thông tin người dùng đã chọn. Chúng ta sẽ sử dụng useQuery để hiển thị danh sách người dùng, bài viết và comment từ API. Cuối cùng, trông file code sẽ tương tự như:

```tsx
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";

import { useFetchPostsByUser } from "./hooks/fetchPostsByUser";
import { useFetchUsers } from "./hooks/fetchUsers";
import { useFetchCommentsByPost } from "./hooks/useFetchCommentsByPost";
import { useSetFirstComment } from "./hooks/useSetFirstComment";
import { useSetFirstPost } from "./hooks/useSetFirstPost";
import { useSetFirstUser } from "./hooks/useSetFirstUser";
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
```

- Ảnh minh hoạ giao diện
![Ảnh minh hoạ](https://mm.nal.vn/files/r1mky61h67dr9kcm7n3579axty/public?h=P0Hzw7GUa0HxOyAFnRpX-bBlAsatRxLIXPP2Xk1vB_Q)

### Source code
- [Source code tham khảo](https://github.com/toannh-nalvn/reactjs-sample-testing/releases/tag/v1.0.0)

### Tổng kết
Bài viết này đã hướng dẫn bạn cách sử dụng React Query để gọi API và React Hook Form để quản lý và xử lý dữ liệu biểu mẫu. Kết hợp hai thư viện này giúp giảm thiểu code, tăng khả năng tái sử dụng và làm cho việc quản lý dữ liệu API trở nên dễ dàng hơn.

### Bài viết tham khảo
- [Làm sao để viết Unit Test trong ReactJS? (Phần 1)](https://learningpool.nal.vn/blog/lam-sao-de-viet-unit-test-trong-reactjs-phan-1)
- [Làm sao để viết Unit Test trong ReactJS? (Phần 2)](https://learningpool.nal.vn/blog/lam-sao-de-viet-unit-test-trong-reactjs-phan-2)