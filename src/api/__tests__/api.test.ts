import { describe, it, expect, vi, MockInstance } from "vitest";
import * as api from "@/api/apiHelper";
import { fetchQuiz, submitQuiz, fetchQuizResult } from "@/api";

describe("API functions", () => {
  let mockGet: MockInstance;
  let mockPost: MockInstance;

  vi.spyOn(api, "handleAxiosError").mockImplementation(() => null);

  beforeEach(() => {
    mockGet = vi.spyOn(api.axiosApiInstance, "get");
    mockPost = vi.spyOn(api.axiosApiInstance, "post");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchQuiz", () => {
    it("should fetch quiz data successfully", async () => {
      const themeId = "123";
      const mockResponse = { data: { quiz: "Sample Quiz" } };
      vi.mocked(mockGet).mockResolvedValueOnce(mockResponse);

      const data = await fetchQuiz(themeId);
      expect(mockGet).toHaveBeenCalledWith(
        `/user/quiz/random?themeId=${themeId}`
      );
      expect(data).toEqual(mockResponse.data);
    });

    it("should handle fetch quiz error", async () => {
      const themeId = "123";
      vi.mocked(mockGet).mockRejectedValue(new Error("Failed to fetch quiz"));
      await expect(fetchQuiz(themeId)).rejects.toThrow(
        "RANDOM_QUIZ_UNAVAILABLE"
      );
    });
  });

  describe("submitQuiz", () => {
    it("should submit quiz answers successfully", async () => {
      const quizId = "quiz123";
      const answers = [{ questionId: "q1", answers: ["a1", "a2"] }];
      const mockResponse = { data: { result: "Quiz Result" } };
      vi.mocked(mockPost).mockResolvedValue(mockResponse);

      const data = await submitQuiz({ quizId, answers });
      expect(mockPost).toHaveBeenCalledWith(
        `/user/quiz/${quizId}/submit`,
        answers
      );
      expect(data).toEqual(mockResponse.data);
    });

    it("should handle submit quiz error", async () => {
      const quizId = "quiz123";
      const answers = [{ questionId: "q1", answers: ["a1", "a2"] }];
      vi.mocked(mockPost).mockRejectedValue(new Error("Failed to submit quiz"));

      await expect(submitQuiz({ quizId, answers })).rejects.toThrow(
        "QUIZ_ALREADY_TAKEN"
      );
    });
  });

  describe("fetchQuizResult", () => {
    it("should fetch quiz result successfully", async () => {
      const quizId = "quiz123";
      const mockResponse = { data: { result: "Quiz Result" } };
      vi.mocked(mockGet).mockResolvedValueOnce(mockResponse);

      const data = await fetchQuizResult(quizId);
      expect(mockGet).toHaveBeenCalledWith(`/user/quiz/${quizId}/result`);
      expect(data).toEqual(mockResponse.data);
    });

    it("should handle fetch quiz result error", async () => {
      const quizId = "quiz123";
      vi.mocked(mockGet).mockRejectedValue(
        new Error("Failed to fetch quiz result")
      );
      await expect(fetchQuizResult(quizId)).rejects.toThrow(
        "QUIZ_RESULT_NOT_FOUND"
      );
    });
  });
});
