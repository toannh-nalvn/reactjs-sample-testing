import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Comment {
  id: number;
  name: string;
  body: string;
}

const fetchCommentsByPost = async (postId: string): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.data;
};

export const useFetchCommentsByPost = (postId: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPost(postId),
    enabled: !!postId,
    staleTime: 300000, // 5 phút
  });
};
