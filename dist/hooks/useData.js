import React from "../../_snowpack/pkg/react.js";
import dayjs from "../../_snowpack/pkg/dayjs.js";
import {firestore} from "../db.js";
import {useMutation} from "../../_snowpack/pkg/react-query.js";
const USER_COLLECTION = "users";
const LOG_COLLECTION = "logs";
export const useData = ({user}) => {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    firestore.collection(USER_COLLECTION).doc(user).collection(LOG_COLLECTION).onSnapshot(function(querySnapshot) {
      const result = [];
      querySnapshot.docs.forEach((log) => {
        const logData = log.data();
        result.push({
          _id: log.id,
          data: logData.logs,
          start: "",
          type: "",
          weight: logData.weight,
          isProcessed: logData.processed,
          duration: logData.duration,
          created: {
            seconds: logData.created ? new Date(logData.created).getTime() : -1,
            date: logData.created ? dayjs(logData.created).format("D ddd MMM YYYY HH:mm:ss") : "Unknown"
          },
          user: user || ""
        });
      });
      setData(result);
    });
  }, []);
  return data;
};
export const deleteLogData = (user) => {
  const mutation = useMutation((logId) => {
    return firestore.collection(USER_COLLECTION).doc(user).collection(LOG_COLLECTION).doc(logId).delete();
  });
  return mutation;
};
export const markAsProcessedLogData = (user) => {
  const mutation = useMutation((logId, processed = true) => {
    return firestore.collection(USER_COLLECTION).doc(user).collection(LOG_COLLECTION).doc(logId).set({processed}, {merge: true});
  });
  return mutation;
};
