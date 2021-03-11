import React from "react";
import { useQuery } from "react-query";

import { FirebaseClient } from "./useFirebase";

const QUERY_USERS_KEY = "users";

export interface User {
  active: boolean;
  id: number;
  name: string;
}

interface RawUser {
  name: string;
  fields?: {
    active?: {
      booleanValue: boolean;
    };
  };
}
export const useUsers = ({ idToken }: { idToken?: string }) => {
  const { isLoading, error, data } = useQuery<User[]>(
    QUERY_USERS_KEY,
    async () => {
      if (!idToken) {
        return [];
      }
      const users = await FirebaseClient.getUsers({ idToken });

      const procssedUsers: User[] = users.map((user: RawUser) => {
        // console.log("user", user);
        const userPath = user.name.split("/");

        return {
          name: userPath[userPath.length - 1],
          active: user.fields?.active?.booleanValue || false,
        };
      });

      return procssedUsers.filter((user) => user.active);
    }
  );

  return { isLoading, error, data };
};
