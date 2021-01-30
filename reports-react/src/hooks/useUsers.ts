import React from "react";
import {useQuery} from 'react-query'

import {firestore} from '../db'

const USERS_KEY = 'users'

export const useUsers = () => {
  const {isLoading, error, data} = useQuery(USERS_KEY, () =>
    firestore.collection("users").where("active", "==", true)
      .get()
      .then(function (querySnapshot) {
        const users: string[] = []

        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          users.push(doc.id)
        });

        return users
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  )

  // console.log('Starting to get users')

  return {isLoading, error, data}
}