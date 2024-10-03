import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuizFacade } from "@/store";
import { IQuestion } from "@/types";
import Questions from "../Questions";

vi.mock("@/store", () => ({
  useQuizFacade: vi.fn(),
}));

describe("Questions Component", () => {
  const mockSetAnswers = vi.fn();
  const quizFacadeMock = {
    quizId: "",
    answers: {},
    setAnswers: mockSetAnswers,
    setCurrentQuizId: vi.fn(),
    resetAnswers: vi.fn(),
    resetQuizId: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuizFacade).mockReturnValue(quizFacadeMock);
  });

  const questionData = [
    {
      id: "q1",
      question: "What is the capital of France?",
      choices: {
        a: "Paris",
        b: "London",
        c: "Berlin",
      },
      answerType: "SINGLE",
      points: 1,
    },
    {
      id: "q2",
      question: "What is 2 + 2?",
      choices: {
        a: "3",
        b: "4",
        c: "5",
      },
      answerType: "SINGLE",
      points: 1,
    },
  ] as IQuestion[];

  it("renders the questions and choices correctly", () => {
    render(<Questions data={questionData} />);

    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls setAnswers with correct arguments when a choice is clicked", () => {
    render(<Questions data={questionData} />);

    fireEvent.click(screen.getByText("Paris"));

    expect(mockSetAnswers).toHaveBeenCalledWith({
      ...quizFacadeMock.answers,
      q1: ["a"],
    });
  });

  it("applies correct styling to the selected answer", () => {
    vi.mocked(useQuizFacade).mockReturnValue({
      ...quizFacadeMock,
      answers: {
        q1: ["a"],
      },
    });

    render(<Questions data={questionData} />);

    const parisButton = screen.getByText("Paris");
    expect(parisButton).toHaveClass(
      "bg-white text-black border border-gray-300"
    );

    const londonButton = screen.getByText("London");
    expect(londonButton).toHaveClass("bg-primary-red text-white");
  });
});
