import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { UseQueryResult } from "@tanstack/react-query";
import { useGetQuizResult } from "@/hooks/useQuiz";
import { quizResultData } from "@/api/mockData";
import { IQuizResult } from "@/types";
import Result from "../Result";

describe("Result", () => {
  beforeEach(() => {
    vi.mock("@/hooks/useQuiz", async () => {
      const actual = await vi.importActual("@/hooks/useQuiz");
      return {
        ...actual,
        useGetQuizResult: vi.fn(),
      };
    });
  });

  it("should renders UI properly", () => {
    vi.mocked(useGetQuizResult).mockReturnValueOnce({
      isLoading: false,
      data: quizResultData,
    } as UseQueryResult<IQuizResult>);

    const { getByTestId, getByText, getAllByText } = render(<Result />);
    expect(getByTestId("quiz-result-testid")).toBeInTheDocument();
    expect(getByText(/Score/i)).toBeInTheDocument();
    expect(getAllByText(/Correct answer/i)[0]).toBeInTheDocument();
  });
});
