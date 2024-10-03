import { axiosApiInstance, handleAxiosError } from "@/api/apiHelper";

export const fetchQuiz = async (themeId: string) => {
  try {
    const response = await axiosApiInstance.get(
      `/user/quiz/random?themeId=${themeId}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw {
      status: "PRECONDITION_FAILED",
      message: "RANDOM_QUIZ_UNAVAILABLE",
      traceId: "91b04b58543b84c9",
    };
  }
};

export const submitQuiz = async ({
  quizId,
  answers,
}: {
  quizId: string;
  answers: { questionId: string; answers: string[] }[];
}) => {
  try {
    const response = await axiosApiInstance.post(
      `/user/quiz/${quizId}/submit`,
      answers
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw {
      status: "PRECONDITION_FAILED",
      message: "QUIZ_ALREADY_TAKEN",
      traceId: "91b04b58543b84c9",
    };
  }
};

export const fetchQuizResult = async (quizId: string) => {
  try {
    const response = await axiosApiInstance.get(`/user/quiz/${quizId}/result`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw {
      status: "NOT_FOUND",
      message: "QUIZ_RESULT_NOT_FOUND",
    };
  }
};
