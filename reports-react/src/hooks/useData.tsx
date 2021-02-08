import React from "react";
import type firebase from 'firebase'

import {firestore} from '../db'
import type {UserRecord, Log, UserLog} from "../types";

interface Props {
  user?: string
}
export const useData = ({user}: Props) => {
  const [data, setData] = React.useState<UserLog[]>()

  React.useEffect(() => {
    if (user) {
      firestore.collection("users")
        .doc(user)
        .onSnapshot(function (querySnapshot) {

          const allData = querySnapshot.data() as UserRecord;
          // const allData = querySnapshot.data() as Data

          const final = allData.logs.map((log) => {
            // console.log('log', log)
            return {
              user,
              ...log
            }
          })

          setData(final);
        });
    } else {
      getUsers(firestore).then((newData) => {
        if (!data) {
          setData(newData)
        }

        if (newData && data) {
          setData([...data, ...newData])
        }
      })
    }
  }, [])

  return data
}

const getUsers = async (firestore: firebase.firestore.Firestore) => {
  const result: UserLog[] = [];
  await firestore.collection("users")
    .where("active", "==", true)
    .get()
    .then((querySnapshot) => {
      // console.log('querySnapshot', querySnapshot);
      // doc.data() is never undefined for query doc snapshots
      querySnapshot.forEach((doc) => {
        // user -> {logs: xx, etc}
        // console.log(doc.id, " => ", doc.data());

        const logs = doc.data().logs as Log[]
        // console.log('logs', logs);
        if (logs) {
          logs.forEach((info) => {
            result.push({
              ...info,
              user: doc.id
            })
          })

        }

      })
    })

  return result
}