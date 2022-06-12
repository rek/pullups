import type { UserRecord } from "../types";

export const generateUserRecord = (extras: Partial<UserRecord> = {}) => {
  return {
    logs: [],
    active: false,
    pullups: 0,

    ...extras,
  };
};
