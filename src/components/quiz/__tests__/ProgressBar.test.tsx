import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgressBar from "../ProgressBar";

describe("ProgressBar", () => {
  it("should render the correct progress width", () => {
    const currentIndex = 3;
    const totalQuestions = 10;

    render(
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
      />
    );

    const expectedProgress = Math.round(
      (Math.min(currentIndex + 2, totalQuestions) / totalQuestions) * 100
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle(`width: ${expectedProgress}%`);
  });

  it("should display the correct number of remaining questions", () => {
    const currentIndex = 3;
    const totalQuestions = 10;

    render(
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
      />
    );

    expect(
      screen.getByText(
        `${
          totalQuestions - currentIndex - 2
        }/${totalQuestions} questions remaining`
      )
    ).toBeInTheDocument();
  });
});
