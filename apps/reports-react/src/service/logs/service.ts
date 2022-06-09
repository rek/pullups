import dayjs from "dayjs";

import { UserLog } from "../../types";

const USER_COLLECTION = "users";
const LOG_COLLECTION = "logs";

interface Props {
  user?: string;
}
export const fetchLogs = async ({ user }: Props) => {
  // const result = firestore
  //   .collection(USER_COLLECTION)
  //   .doc(user)
  //   .collection(LOG_COLLECTION)
  //   .onSnapshot(function (querySnapshot) {
  //     const result: UserLog[] = [];
  //     querySnapshot.docs.forEach((log) => {
  //       const logData = log.data();
  //       // console.log('log', log)
  //       // console.log("logData", logData);
  //       result.push({
  //         _id: log.id,
  //         data: logData.logs,
  //         start: "",
  //         type: "",
  //         weight: logData.weight,
  //         isProcessed: logData.processed,
  //         duration: logData.duration,
  //         created: {
  //           seconds: logData.created ? new Date(logData.created).getTime() : -1,
  //           date: logData.created
  //             ? dayjs(logData.created).format("D ddd MMM YYYY HH:mm:ss")
  //             : "Unknown",
  //         },
  //         user: user || "",
  //       });
  //     });
  //     return result;
  //   });
  // await result;
  // console.log("result", result);
};
