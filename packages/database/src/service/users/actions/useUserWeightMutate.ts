import { useMutation, useQueryClient } from "react-query";
import { getDatabase } from "../../../getDatabase";
import { FIREBASE_COLLECTION_USERS, QUERY_KEY_USER } from "../keys";

import type { User } from "../types";

export const useUserWeightMutate = (user: string) => {
  const queryClient = useQueryClient();
  const { firestore } = getDatabase();

  const mutation = useMutation(
    ({ weight, weightLastUpdated, ...otherUserFields }: Partial<User>) => {
      return Promise.resolve();
      // return firestore
      //   .collection(FIREBASE_COLLECTION_USERS)
      //   .doc(user)
      //   .update({ weight, weightLastUpdated });
    },
    {
      onSuccess: (data, next) => {
        queryClient.setQueryData([QUERY_KEY_USER, user], next);
      },
    }
  );

  return mutation;
};
