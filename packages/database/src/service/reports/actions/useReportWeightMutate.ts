import { useMutation } from "react-query";
import { FIREBASE_COLLECTION_REPORTS } from "../keys";

export const useReportWeightMutate = (user: string) => {
  // const mutation = useMutation((data: ProcessedLog) => {
  //   return firestore
  //     .collection(FIREBASE_COLLECTION_REPORTS)
  //     .doc(user)
  //     .collection("weight")
  //     .add(data);
  // });
  // return mutation;
};
