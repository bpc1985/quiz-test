import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuizFacade } from "@/store";
import { useSubmitQuiz } from "@/hooks/useQuiz";
import { IQuestion } from "@/types";
import NextSubmit from "../NextSubmit";

vi.mock("@/store", () => ({
  useQuizFacade: vi.fn(),
}));

vi.mock("@/hooks/useQuiz", () => ({
  useSubmitQuiz: vi.fn(),
}));

describe("NextSubmit Component", () => {
  const mockSetCurrentIndex = vi.fn();
  const mockSubmitAsyncQuiz = vi.fn();

  const quizFacadeMock = {
    quizId: "123",
    answers: {
      question1: ["answer1"],
      question2: ["answer2"],
    },
    setCurrentQuizId: vi.fn(),
    setAnswers: vi.fn(),
    resetAnswers: vi.fn(),
    resetQuizId: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useQuizFacade).mockReturnValue(quizFacadeMock);
    vi.mocked(useSubmitQuiz).mockReturnValue(mockSubmitAsyncQuiz);
  });

  const currentQuestions = [
    { id: "question1", question: "Question 1" },
    { id: "question2", question: "Question 2" },
  ] as IQuestion[];

  it("renders the 'Submit' button on the last page", () => {
    render(
      <NextSubmit
        isLastPage={true}
        currentIndex={0}
        setCurrentIndex={mockSetCurrentIndex}
        currentQuestions={currentQuestions}
        totalQuestions={4}
      />
    );

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders the 'Continue quiz' button when not on the last page", () => {
    render(
      <NextSubmit
        isLastPage={false}
        currentIndex={0}
        setCurrentIndex={mockSetCurrentIndex}
        currentQuestions={currentQuestions}
        totalQuestions={4}
      />
    );

    expect(screen.getByText("Continue quiz")).toBeInTheDocument();
  });

  it("calls the submitAsyncQuiz function when 'Submit' is clicked", () => {
    render(
      <NextSubmit
        isLastPage={true}
        currentIndex={0}
        setCurrentIndex={mockSetCurrentIndex}
        currentQuestions={currentQuestions}
        totalQuestions={4}
      />
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(mockSubmitAsyncQuiz).toHaveBeenCalledWith({
      quizId: "123",
      answers: [
        { questionId: "question1", answers: ["answer1"] },
        { questionId: "question2", answers: ["answer2"] },
      ],
    });
  });

  it("calls setCurrentIndex when 'Continue quiz' is clicked", () => {
    render(
      <NextSubmit
        isLastPage={false}
        currentIndex={0}
        setCurrentIndex={mockSetCurrentIndex}
        currentQuestions={currentQuestions}
        totalQuestions={4}
      />
    );

    fireEvent.click(screen.getByText("Continue quiz"));
    expect(mockSetCurrentIndex).toHaveBeenCalledWith(2);
  });

  it("disables the buttons when validation fails (isValid is false)", () => {
    const invalidAnswers = { question1: ["answer1"] };

    vi.mocked(useQuizFacade).mockReturnValue({
      ...quizFacadeMock,
      answers: invalidAnswers,
    });

    render(
      <NextSubmit
        isLastPage={true}
        currentIndex={0}
        setCurrentIndex={mockSetCurrentIndex}
        currentQuestions={currentQuestions}
        totalQuestions={4}
      />
    );

    expect(screen.getByText("Submit")).toBeDisabled();
  });
});
