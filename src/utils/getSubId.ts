import { v4 } from "uuid";

let subId: string;

export const getSubId = () => {
  if (!subId) {
    subId = localStorage.getItem("subId") || v4();
    localStorage?.setItem("subId", subId);
  }

  return subId;
};
