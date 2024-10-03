import { FC, Dispatch, SetStateAction } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubmitQuiz } from "@/hooks/useQuiz";
import { useQuizFacade } from "@/store";
import { IQuestion } from "@/types";

interface NextSubmitProp {
  isLastPage: boolean;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  currentQuestions: IQuestion[];
  totalQuestions: number;
}

const NextSubmit: FC<NextSubmitProp> = ({
  isLastPage,
  currentIndex,
  setCurrentIndex,
  currentQuestions,
  totalQuestions,
}) => {
  const { quizId, answers } = useQuizFacade();
  const submitAsyncQuiz = useSubmitQuiz();

  const isValid = currentQuestions.reduce(
    (check, question) => check && Object.keys(answers).includes(question.id),
    true
  );

  const handleSubmit = () => {
    submitAsyncQuiz({
      quizId,
      answers: Object.entries(answers).map(([questionId, answers]) => ({
        questionId,
        answers,
      })),
    });
  };

  return isLastPage ? (
    <Button variant="red" disabled={!isValid} onClick={handleSubmit}>
      Submit
    </Button>
  ) : (
    <Button
      variant="red"
      disabled={!isValid}
      onClick={() =>
        setCurrentIndex(Math.min(totalQuestions - 2, currentIndex + 2))
      }
    >
      <ArrowRight className="mr-2 h-4 w-4" /> Continue quiz
    </Button>
  );
};

export default NextSubmit;
