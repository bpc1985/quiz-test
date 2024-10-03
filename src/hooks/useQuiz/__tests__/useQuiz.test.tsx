import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useGetQuizResult,
  useGetRandomQuiz,
  useSubmitQuiz,
} from "@/hooks/useQuiz";
import { fetchQuiz, fetchQuizResult, submitQuiz } from "@/api";
import { useQuizFacade } from "@/store";

vi.mock("@/api", () => ({
  fetchQuiz: vi.fn(),
  fetchQuizResult: vi.fn(),
  submitQuiz: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@/store", () => ({
  useQuizFacade: vi.fn(),
}));

describe("useGetRandomQuiz", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return quiz data when API call is successful", async () => {
    const mockQuizData = { quizId: "123", quizName: "Sample Quiz" };
    vi.mocked(fetchQuiz).mockResolvedValue(mockQuizData);

    const { result } = renderHook(() => useGetRandomQuiz("test-theme-id"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockQuizData);
    expect(fetchQuiz).toHaveBeenCalledWith("test-theme-id");
  });
});

describe("useGetQuizResult", () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return quiz result when API call is successful", async () => {
    const mockQuizResult = { score: 85, correctAnswers: 10 };
    vi.mocked(fetchQuizResult).mockResolvedValue(mockQuizResult);

    const { result } = renderHook(() => useGetQuizResult("test-quiz-id"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockQuizResult);
    expect(fetchQuizResult).toHaveBeenCalledWith("test-quiz-id");
  });
});

describe("useSubmitQuiz", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const mockNavigate = vi.fn();
  const mockResetAnswers = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useQuizFacade).mockReturnValue({
      quizId: "",
      answers: {},
      setCurrentQuizId: vi.fn(),
      setAnswers: vi.fn(),
      resetAnswers: mockResetAnswers,
      resetQuizId: vi.fn(),
    });
    vi.clearAllMocks();
  });

  it("should submit the quiz and navigate to result page on success", async () => {
    vi.mocked(submitQuiz).mockResolvedValue({});
    const { result } = renderHook(() => useSubmitQuiz(), { wrapper });

    const mockAnswers = [
      { questionId: "q1", answers: ["a1"] },
      { questionId: "q2", answers: ["a2"] },
    ];

    await result.current({ quizId: "quiz123", answers: mockAnswers });

    await waitFor(() => {
      expect(submitQuiz).toHaveBeenCalledWith({
        quizId: "quiz123",
        answers: mockAnswers,
      });
    });

    expect(mockResetAnswers).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/result");
  });

  it("should handle errors during quiz submission", async () => {
    const mockError = new Error("Submission failed");
    vi.mocked(submitQuiz).mockRejectedValue(mockError);

    const { result } = renderHook(() => useSubmitQuiz(), { wrapper });

    await expect(
      result.current({ quizId: "quiz123", answers: [] })
    ).rejects.toThrow("Submission failed");

    expect(mockResetAnswers).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
