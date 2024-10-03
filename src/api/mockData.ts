import { IQuiz } from "@/types";

export const randomQuizData: IQuiz = {
  quizId: "63b2eb294d9a591eddbcfa71",
  quizName: "Theme quiz test",
  imageUrl: "https://www.google.com",
  iconUrl: "https://www.google.com",
  questions: [
    {
      id: "63280f8cf4a73e5f0e362086",
      question:
        "What do you call a person or an organization that lends money?",
      choices: {
        "1": "Creditor",
        "2": "Debtor",
        "3": "Investor",
        "4": "None of the above",
      },
      answerType: "SINGLE",
      points: 1,
    },
    {
      id: "62f219f8443d8a3ed1528a93",
      question: "Bitcoin is created as a reward for a process known as?",
      choices: {
        "1": "Wallet",
        "2": "Blockchain",
        "3": "Mining",
        "4": "Bubble",
      },
      answerType: "MULTIPLE",
      points: 1,
    },
    {
      id: "92280f8cf4a73e5f0e362086",
      question: "What is the capital of Finland?",
      choices: {
        "1": "Berlin",
        "2": "Helsinki",
        "3": "Moscow",
        "4": "None of the above",
      },
      answerType: "SINGLE",
      points: 1,
    },
    {
      id: "82f219f8443d8a3ed1528a93",
      question: "What is total of 2 and 3?",
      choices: {
        "1": "5",
        "2": "7",
        "3": "8",
        "4": "9",
      },
      answerType: "SINGLE",
      points: 1,
    },
    {
      id: "34f249f8443d8a3ed1528a93",
      question: "Which continent does China belong to?",
      choices: {
        "1": "Europe",
        "2": "Asia",
        "3": "North America",
        "4": "Africa",
      },
      answerType: "SINGLE",
      points: 1,
    },
  ],
};

export const quizResultData = {
  quizId: "63b2eb294d9a591eddbcfa71",
  quizName: "Theme quiz test",
  totalScore: 2,
  userScore: 1,
  resultDetails: [
    {
      questionId: "63280f8cf4a73e5f0e362086",
      question:
        "What do you call a person or an organization that lends money?",
      correctAnswer: "1",
      userAnswer: "2",
      isCorrect: false,
    },
    {
      questionId: "62f219f8443d8a3ed1528a93",
      question: "Bitcoin is created as a reward for a process known as?",
      correctAnswer: "3",
      userAnswer: "3",
      isCorrect: true,
    },
  ],
};

export const submitQuizData = [
  {
    questionId: "63280f8cf4a73e5f0e362086",
    answers: ["1"],
  },
  {
    questionId: "62f219f8443d8a3ed1528a93",
    answers: ["3"],
  },
];
