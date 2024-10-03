import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchQuiz, fetchQuizResult, submitQuiz } from "@/api";
import { IQuiz, IQuizResult } from "@/types";
import { useQuizFacade } from "@/store";

export const useGetRandomQuiz = (
  themeId: string | null
): UseQueryResult<IQuiz | null, Error> => {
  const res = useQuery({
    queryKey: ["useGetRandomQuiz", themeId],
    queryFn: async () => {
      const quizzes = themeId ? await fetchQuiz(themeId) : null;
      return quizzes;
    },
    enabled: !!themeId,
  });
  return res;
};

export const useSubmitQuiz = () => {
  const navigate = useNavigate();
  const { resetAnswers } = useQuizFacade();
  const { mutateAsync: submitAsyncQuiz } = useMutation({
    mutationKey: ["useSubmitQuiz"],
    mutationFn: async ({
      quizId,
      answers,
    }: {
      quizId: string;
      answers: { questionId: string; answers: string[] }[];
    }) => {
      await submitQuiz({ quizId, answers });
    },
    onSuccess: () => {
      resetAnswers();
      navigate(`/result`);
    },
  });

  return submitAsyncQuiz;
};

export const useGetQuizResult = (
  quizId: string | null
): UseQueryResult<IQuizResult, Error> => {
  const res = useQuery({
    queryKey: ["useGetQuizResult", quizId],
    queryFn: async () => {
      const result = quizId ? await fetchQuizResult(quizId) : null;
      return result;
    },
    enabled: !!quizId,
  });
  return res;
};
