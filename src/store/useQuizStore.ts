import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

import quizSlice, { IQuizSlice } from "./quizSlice";

export type IQuizStore = IQuizSlice;

export const useQuizStore = createWithEqualityFn<IQuizStore>()(
  devtools(
    immer((...args) => ({
      ...quizSlice(...args),
    })),
    { name: "quiz-store" }
  ),
  shallow
);

// Inspect your store in React DevTools
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("quizStore", useQuizStore);
}
