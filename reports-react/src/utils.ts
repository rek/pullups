import dayjs from "dayjs";

export const getShortDate = (timestamp?: number) => {
  if (!timestamp) {
    return "";
  }

  return dayjs(timestamp).format("ddd D/MM/YY ha");
};
