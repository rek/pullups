import { getUsersCollection } from "database"
import { collection, getDocs, query, where } from "firebase/firestore"

import { ProcessedLog } from "./types"

const FIREBASE_KEY_COLLECTION_PROCESSED_LOGS = "processedLogs"

const getCollection = (user: string) => {
  return getUsersCollection([user, FIREBASE_KEY_COLLECTION_PROCESSED_LOGS])
}

const ErrorResult: ProcessedLog[] = []

export const getLogsProcessed = async (user: string) => {
  const collection = getCollection(user)
  const result: ProcessedLog[] = []
  const querySnapshot = await getDocs(collection)
  querySnapshot.docs.forEach(function (doc) {
    result.push(doc.data() as ProcessedLog)
  })

  console.log("result", result)

  if (result) {
    return result
  }

  return ErrorResult
}

export const getLogProcessed = async (user: string, logId: string) => {
  const collection = getCollection(user)
  const logQuery = query(collection, where("logId", "==", logId))
  const querySnapshot = await getDocs(logQuery)
  const result: ProcessedLog[] = []

  querySnapshot.forEach(function (doc) {
    result.push(doc.data() as ProcessedLog)
  })

  console.log("Log by ID result:", result)

  if (result) {
    return result
  }

  return ErrorResult
}
