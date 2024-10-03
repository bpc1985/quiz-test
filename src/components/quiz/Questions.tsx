import { FC } from "react";
import { Button } from "@/components/ui/button";
import { IQuestion } from "@/types";
import { useQuizFacade } from "@/store";

interface QuestionsProp {
  data: IQuestion[];
}

const Questions: FC<QuestionsProp> = ({ data }) => {
  const { answers, setAnswers } = useQuizFacade();

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: [answer] });
  };

  return (
    <>
      {data.map(question => (
        <div key={question.id} className="mx-6">
          <div className="bg-question-grey p-4 rounded-lg mb-4">
            <h3 className="text-black text-xl font-semibold">
              {question.question}
            </h3>
          </div>

          <div className="flex flex-row gap-6 mb-4">
            {question.choices &&
              Object.entries(question.choices).map(([key, value]) => (
                <Button
                  key={key}
                  onClick={() => handleAnswer(question.id, key)}
                  className={`w-full justify-start ${
                    answers[question.id]?.[0] === key
                      ? "bg-white text-black border border-gray-300"
                      : "bg-primary-red text-white"
                  }`}
                >
                  {String(value)}
                </Button>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Questions;
