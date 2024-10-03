import { act, renderHook } from "@testing-library/react";
import { useQuizFacade } from "../useQuizFacade";

describe("useQuizFacade", () => {
  it("should have an initial value", () => {
    const { result } = renderHook(() => useQuizFacade());
    expect(result.current.quizId).toEqual("");
    expect(result.current.answers).toEqual({});
  });

  it("should be able to setCurrentQuizId", () => {
    const { result } = renderHook(() => useQuizFacade());
    act(() => {
      result.current.setCurrentQuizId("abc123");
    });
    expect(result.current.quizId).toEqual("abc123");
  });

  it("should be able to setAnswers", () => {
    const { result } = renderHook(() => useQuizFacade());
    act(() => {
      result.current.setAnswers({ "1": ["1"] });
    });
    expect(result.current.answers).toEqual({ "1": ["1"] });
  });

  it("should be able to resetAnswers", () => {
    const { result } = renderHook(() => useQuizFacade());
    act(() => {
      result.current.resetAnswers();
    });
    expect(result.current.answers).toEqual({});
  });

  it("should be able to resetQuizId", () => {
    const { result } = renderHook(() => useQuizFacade());
    act(() => {
      result.current.resetQuizId();
    });
    expect(result.current.quizId).toEqual("");
  });
});
