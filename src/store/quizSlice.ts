import { StateCreator } from "zustand";

export type AnswerListType = Record<string, string[]>;

export interface IQuizSlice {
  quizId: string;
  answers: Record<string, string[]>;
  setCurrentQuizId: (id: string) => void;
  setAnswers: (data: AnswerListType) => void;
  resetAnswers: () => void;
  resetQuizId: () => void;
}

const userSlice: StateCreator<
  IQuizSlice,
  [["zustand/devtools", never], ["zustand/immer", never]]
> = set => ({
  quizId: "",
  answers: {},
  setCurrentQuizId: id => set({ quizId: id }),
  setAnswers: (data: AnswerListType) => {
    set(state => void (state.answers = data));
  },
  resetAnswers: () => {
    set(state => void (state.answers = {}));
  },
  resetQuizId: () => {
    set(state => void (state.quizId = ""));
  },
});

export default userSlice;
