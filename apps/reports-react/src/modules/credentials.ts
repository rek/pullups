import { atom, selector } from "recoil"

export const credentialsEmail = atom({
  key: "credentialsEmail",
  default: "",
})
export const credentialsPassword = atom({
  key: "credentialsPassword",
  default: "",
})

export const credentialsState = selector({
  key: "credentialsState",
  get: ({ get }) => {
    const email = get(credentialsEmail)
    const password = get(credentialsPassword)

    return { email, password }
  },
})
