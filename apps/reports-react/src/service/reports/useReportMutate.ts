import { useMutation } from "react-query";

import { firestore } from "../../db";
import type { ProcessedLog } from "../../types";
import { FIREBASE_COLLECTION_REPORTS } from "./useReportQuery";

export const mutateReport = (user: string, version: string = "v1") => {
  const mutation = useMutation((data: ProcessedLog) => {
    return firestore
      .collection(FIREBASE_COLLECTION_REPORTS)
      .doc(user)
      .collection(version)
      .add(data);
  });

  return mutation;
};

export const mutateReportWeight = (user: string) => {
  const mutation = useMutation((data: ProcessedLog) => {
    return firestore
      .collection(FIREBASE_COLLECTION_REPORTS)
      .doc(user)
      .collection("weight")
      .add(data);
  });

  return mutation;
};
