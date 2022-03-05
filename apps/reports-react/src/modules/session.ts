import { atom, selector } from "recoil";

export const userSession = atom({
  key: "userSession",
  default: 1,
});

export const sessionState = selector({
  key: "userSessionState",
  get: ({ get }) => {
    const session = get(userSession);

    return session;
  },
});
