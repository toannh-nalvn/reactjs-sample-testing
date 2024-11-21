import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
}

const fetchPostsByUser = async (userId: string): Promise<Post[]> => {
  const response = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return response.data;
};

const useFetchPostsByUser = (userId: string) => {
  return useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
    enabled: !!userId,
    staleTime: 300000, // 5 phút
  });
};

export default useFetchPostsByUser;
