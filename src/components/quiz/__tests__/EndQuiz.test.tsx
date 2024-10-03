import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useQuizFacade } from "@/store";
import EndQuiz from "../EndQuiz";

vi.mock("react-router-dom", async () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@/store", () => ({
  useQuizFacade: vi.fn(),
}));

describe("EndQuiz", () => {
  const mockNavigate = vi.fn();
  const mockResetAnswers = vi.fn();
  const mockResetQuizId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useQuizFacade).mockReturnValue({
      quizId: "",
      answers: {},
      setCurrentQuizId: vi.fn(),
      setAnswers: vi.fn(),
      resetAnswers: mockResetAnswers,
      resetQuizId: mockResetQuizId,
    });
  });

  it("should render the 'End quiz and exit' button", () => {
    render(
      <MemoryRouter>
        <EndQuiz />
      </MemoryRouter>
    );

    expect(screen.getByText("End quiz and exit")).toBeInTheDocument();
  });

  it("should show the confirmation dialog when 'End quiz and exit' is clicked", () => {
    render(
      <MemoryRouter>
        <EndQuiz />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("End quiz and exit"));

    expect(screen.getByText("Are you sure to end quiz?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action cannot be undone. This will permanently delete your answers."
      )
    ).toBeInTheDocument();
  });

  it("should call reset functions and navigate to '/result' when 'Confirm' is clicked", () => {
    render(
      <MemoryRouter>
        <EndQuiz />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("End quiz and exit"));
    fireEvent.click(screen.getByText("Confirm"));

    expect(mockResetAnswers).toHaveBeenCalled();
    expect(mockResetQuizId).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/result");
  });

  it("should close the dialog when 'Cancel' is clicked", () => {
    render(
      <MemoryRouter>
        <EndQuiz />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("End quiz and exit"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByText("Are you sure to end quiz?")
    ).not.toBeInTheDocument();
  });
});
