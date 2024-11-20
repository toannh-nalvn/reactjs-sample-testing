import { useEffect } from "react";

import { FormData } from "../types";
import { User } from "./fetchUsers";

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
