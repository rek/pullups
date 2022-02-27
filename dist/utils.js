import dayjs from "../_snowpack/pkg/dayjs.js";
export const getShortDate = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return dayjs(timestamp).format("ddd D/MM/YY ha");
};
const logLevel = 2;
export const logInfo = (...rest) => {
  console.log(...rest);
};
export const logWarn = (...rest) => {
  console.log(...rest);
};
export const logDebug = (...rest) => {
  if (logLevel > 2) {
    console.log(...rest);
  }
};
