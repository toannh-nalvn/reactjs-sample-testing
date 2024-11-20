import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: number;
  name: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 300000, // 5 phút
  });
};
