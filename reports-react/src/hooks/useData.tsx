import React from "react";
import type firebase from "firebase";

import { firestore } from "../db";
import type { UserRecord, Log, UserLog } from "../types";

const mainKey = "users";
// const mainKey = "testing";

interface Props {
  user?: string;
}
export const useData = ({ user }: Props) => {
  const [data, setData] = React.useState<UserLog[]>();

  React.useEffect(() => {
    if (user) {
      firestore
        .collection(mainKey)
        .doc(user)
        .onSnapshot(function (querySnapshot) {
          const allData = querySnapshot.data() as UserRecord;
          // const allData = querySnapshot.data() as Data

          const final = allData.logs.map((log) => {
            // console.log('log', log)
            return {
              user,
              ...log,
            };
          });

          setData(final);
        });
    } else {
      firestore
        .collection(mainKey)
        .doc("j")
        .collection("logs")
        .onSnapshot(function (querySnapshot) {
          const result: UserLog[] = [];

          querySnapshot.docs.forEach((log) => {
            const logData = log.data();
            // console.log('log', log)
            // console.log('logData', logData)

            result.push({
              data: logData.logs,
              start: "",
              type: "pullup ",
              weight: logData.weight,
              created: { seconds: 1 },
              user: "test4",
            });
          });
          setData(result);
        });

      // getUsers(firestore).then((newData) => {
      //   if (!data) {
      //     setData(newData)
      //   }

      //   if (newData && data) {
      //     setData([...data, ...newData])
      //   }
      // })
    }
  }, []);

  return data;
};

const getUsers = async (firestore: firebase.firestore.Firestore) => {
  const result: UserLog[] = [];

  await firestore
    .collection(mainKey)
    .where("active", "==", true)
    .get()
    .then((querySnapshot) => {
      // console.log('querySnapshot', querySnapshot);
      // doc.data() is never undefined for query doc snapshots
      querySnapshot.forEach((doc) => {
        // user -> {logs: xx, etc}
        console.log(doc.id, " => ", doc.data());

        const logs = doc.data().logs as Log[];
        // console.log('logs', logs);
        if (logs) {
          logs.forEach((info) => {
            result.push({
              ...info,
              user: doc.id,
            });
          });
        }
      });
    });

  return result;
};
