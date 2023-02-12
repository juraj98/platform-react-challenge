import { v4 } from "uuid";
import { LOCAL_STORAGE } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export const useSubId = () => {
  return useLocalStorage(LOCAL_STORAGE.SUB_ID, v4())[0];
};
