import dayjs from "dayjs";
import { DBLog, Log } from "../types";

export const normalize = (
  log: DBLog,
  extraData: { id: string; user: string }
): Log => {
  return {
    _id: extraData.id,
    data: log.logs,
    start: "",
    type: "",
    weight: log.weight,
    isProcessed: log.processed,
    duration: log.duration,
    created: {
      seconds: log.created ? new Date(log.created).getTime() : -1,
      date: log.created
        ? dayjs(log.created).format("D ddd MMM YYYY HH:mm:ss")
        : "Unknown",
    },
    user: extraData.user || "",
  };
};
