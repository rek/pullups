import { useQuery } from "react-query";
import { getDatabase } from "../../../auth/getDatabase";
import { FIREBASE_COLLECTION_USERS } from "../../users/keys";
import { FIREBASE_COLLECTION_REPORTS, REPORT_QUERY_KEYS } from "../keys";

// reports get procesessed logs where the data is any key there
// that matches one of the fields here.
export const useReportsQuery = (user: string) => {
  const { firestore } = getDatabase();

  return useQuery([REPORT_QUERY_KEYS.BASE, user], () => {
    return Promise.resolve([]);
    // return useQuery<UserReport[]>([REPORT_QUERY_KEYS.BASE, user], () =>
    //   firestore
    //     .collection(FIREBASE_COLLECTION_USERS)
    //     .doc(user)
    //     .collection(FIREBASE_COLLECTION_REPORTS)
    //     .get()
    //     .then(function (querySnapshot) {
    //       const result: UserReport[] = [];
    //       querySnapshot.docs.forEach(function (doc) {
    //         result.push(doc.data() as UserReport);
    //       });
    //       return result;
    //     })
    //     .catch(function (error) {
    //       console.log("Error getting documents: ", error);
    //     })
  });
};
