export type AnswerType = "SINGLE" | "MULTIPLE";

export interface IQuestion {
  id: string;
  question: string;
  choices: Record<string, string>;
  answerType: AnswerType;
  points: number;
}

export interface IQuiz {
  quizId: string;
  quizName: string;
  imageUrl: string;
  iconUrl: string;
  questions: IQuestion[];
}

export interface IQuizResult {
  quizId: string;
  quizName: string;
  totalScore: number;
  userScore: number;
  resultDetails: {
    questionId: string;
    question: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}
