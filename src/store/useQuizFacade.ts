import { IQuizStore, useQuizStore } from "./useQuizStore";
import { shallow } from "zustand/shallow";

export const useQuizFacade = () => {
  const storeStates = useQuizStore(
    (state: IQuizStore) => ({ ...state }),
    shallow
  );
  return { ...storeStates };
};
