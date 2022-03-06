import daysjs from "dayjs";

export const getShortDate = (value: number) => daysjs(value).format("DD/MM");
