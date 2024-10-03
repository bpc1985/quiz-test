import { FC, useState, useEffect } from "react";
import { useGetRandomQuiz } from "@/hooks/useQuiz";
import { useQuizFacade } from "@/store";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
import Title from "./Title";
import EndQuiz from "./EndQuiz";
import NextSubmit from "./NextSubmit";

const THEME_ID = "63a88cf1e774d167cd92c06f";

const Quiz: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCurrentQuizId } = useQuizFacade();

  const { data: quiz, isLoading, error } = useGetRandomQuiz(THEME_ID);

  useEffect(() => {
    if (quiz) {
      setCurrentQuizId(quiz.quizId);
    }
  }, [quiz, setCurrentQuizId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading quiz: {error.message}</div>;

  const questions = quiz?.questions || [];
  const totalQuestions = questions.length;
  const isLastPage = currentIndex >= totalQuestions - 2;

  const currentQuestions =
    isLastPage && totalQuestions % 2 !== 0
      ? [questions[totalQuestions - 1]]
      : [questions[currentIndex], questions[currentIndex + 1]].filter(Boolean);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Title name={quiz?.quizName ?? ""} />
      <hr className="mt-4 bg-grey-bg" />
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
      />
      <Questions data={currentQuestions} />

      <div className="flex justify-end mt-12">
        <EndQuiz />
        <NextSubmit
          isLastPage={isLastPage}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          currentQuestions={currentQuestions}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default Quiz;
