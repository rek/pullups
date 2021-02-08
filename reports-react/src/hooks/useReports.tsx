import React from "react";
import {useQuery} from 'react-query'

import {firestore} from '../db'

const QUERY_KEY = 'reports'

export const useReports = (user: string = 'anette', type: string = 'scale') => {
  const {isLoading, error, data} = useQuery([QUERY_KEY, user], () =>
    firestore.collection("users").doc(user).collection("reports")
      .doc(type)
      .get()
      .then(function (querySnapshot) {
        // console.log(querySnapshot.data());

        return querySnapshot.data();
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  )

  // console.log('Starting to get user', {id})

  return {isLoading, error, data}
}