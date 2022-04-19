import { firestore } from "../db";
import { useMutation } from "react-query";

const LOG_COLLECTION = "logs";

// const getUsers = async (firestore: firebase.firestore.Firestore) => {
//   const result: UserLog[] = [];

//   await firestore
//     .collection(USER_COLLECTION)
//     .where("active", "==", true)
//     .get()
//     .then((querySnapshot) => {
//       // console.log('querySnapshot', querySnapshot);
//       // doc.data() is never undefined for query doc snapshots
//       querySnapshot.forEach((doc) => {
//         // user -> {logs: xx, etc}
//         console.log(doc.id, " => ", doc.data());

//         const logs = doc.data().logs as Log[];
//         // console.log('logs', logs);
//         if (logs) {
//           logs.forEach((info) => {
//             result.push({
//               ...info,
//               _id: doc.id,
//               user: doc.id,
//             });
//           });
//         }
//       });
//     });

//   return result;
// };

export const markAsProcessedLogData = (user: string) => {
  const mutation = useMutation((logId: string, processed = true) => {
    return firestore
      .collection(USER_COLLECTION)
      .doc(user)
      .collection(LOG_COLLECTION)
      .doc(logId)
      .set({ processed }, { merge: true });
  });

  return mutation;
};
