import { FC } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useQuizFacade } from "@/store";
import { useGetQuizResult } from "@/hooks/useQuiz";

const Result: FC = () => {
  const { quizId } = useQuizFacade();
  const { data: result, isLoading, error } = useGetQuizResult(quizId);

  if (isLoading) return <div>Loading results...</div>;
  if (error) return <div>Error loading results: {error.message}</div>;
  if (!result) return <div>No results available</div>;

  return (
    <div className="space-y-6" data-testid="quiz-result-testid">
      <h2 className="text-2xl font-bold">{result.quizName} - Results</h2>
      <div className="text-xl">
        Score: {result.userScore} / {result.totalScore}
      </div>

      {result.resultDetails.map((detail, index) => (
        <Card
          key={index}
          className={detail.isCorrect ? "border-green-500" : "border-red-500"}
        >
          <CardHeader>
            <h3 className="text-lg font-semibold">{detail.question}</h3>
          </CardHeader>
          <CardContent>
            <p>Your answer: {detail.userAnswer}</p>
            <p>Correct answer: {detail.correctAnswer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Result;
