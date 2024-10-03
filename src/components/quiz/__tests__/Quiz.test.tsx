import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useGetRandomQuiz } from "@/hooks/useQuiz";
import { useQuizFacade } from "@/store";
import Quiz from "../Quiz";

vi.mock("@/hooks/useQuiz", () => ({
  useGetRandomQuiz: vi.fn(),
}));

vi.mock("@/store", () => ({
  useQuizFacade: vi.fn(),
}));

describe("Quiz Component", () => {
  const mockSetCurrentQuizId = vi.fn();
  const quizFacadeMock = {
    quizId: "",
    answers: {},
    setCurrentQuizId: mockSetCurrentQuizId,
    setAnswers: vi.fn(),
    resetAnswers: vi.fn(),
    resetQuizId: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuizFacade).mockReturnValue(quizFacadeMock);
  });

  it("displays loading state initially", () => {
    // eslint-disable-next-line
    // @ts-ignore
    vi.mocked(useGetRandomQuiz).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Quiz />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when loading fails", () => {
    vi.mocked(useGetRandomQuiz).mockReturnValue({
      data: null,
      isLoading: false,
      // eslint-disable-next-line
      // @ts-ignore
      error: { message: "Failed to load quiz" },
    });

    render(<Quiz />);
    expect(
      screen.getByText("Error loading quiz: Failed to load quiz")
    ).toBeInTheDocument();
  });
});
