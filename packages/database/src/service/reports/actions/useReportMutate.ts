import { useMutation } from "react-query";
import { FIREBASE_COLLECTION_REPORTS } from "../keys";

export const useReportMutate = (user: string, version: string = "v1") => {
  // const mutation = useMutation((data: ProcessedLog) => {
  //   return firestore
  //     .collection(FIREBASE_COLLECTION_REPORTS)
  //     .doc(user)
  //     .collection(version)
  //     .add(data);
  // });
  // return mutation;
};
