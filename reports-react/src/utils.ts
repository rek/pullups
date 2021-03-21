import dayjs from "dayjs";

export const getShortDate = (timestamp?: number) => {
  if (!timestamp) {
    return "";
  }

  return dayjs(timestamp).format("ddd D/MM/YY ha");
};

const logLevel = 2

export const logInfo = (...rest: any) => {
  console.log(...rest)
}

export const logWarn = (...rest: any) => {
  console.log(...rest)
}

export const logDebug = (...rest: any) => {
  if (logLevel > 2) {
    console.log(...rest)
  }
}
