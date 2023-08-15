import { atom, selector } from "recoil";

export const userState = atom({
  key: "userState",
  default: "",
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    return get(userState);
  },
});
