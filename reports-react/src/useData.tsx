import React from "react";

import {firestore} from './db'
import type {Data, Log} from "./types";


export const useData = () => {
  const [data, setData] = React.useState<Log[]>()

  React.useEffect(() => {
    // firestore.collection("users").get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //   });
    // });

    firestore.collection("users").doc("adam")
      .onSnapshot(function (doc) {
        const allData = doc.data() as Data

        setData(allData.logs)
      });
  }, [])

  return data
}