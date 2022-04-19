import { useMutation, useQueryClient } from "react-query";

import { firestore } from "../db";
import type { User } from "../types";
// import { generateUserRecord } from "../__tests__/utils";
import { FIREBASE_COLLECTION_USERS } from "../service/users";

const QUERY_KEY = "user";
const QUERY_KEY_USER_WEIGHT = "weight";

interface Error {
  error: boolean;
}

export const mutateUserWeight = (user: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ weight, weightLastUpdated, ...otherUserFields }: Partial<User>) => {
      return firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user)
        .update({ weight, weightLastUpdated });
    },
    {
      onSuccess: (data, next) => {
        queryClient.setQueryData([QUERY_KEY, user], next);
      },
    }
  );

  return mutation;
};
