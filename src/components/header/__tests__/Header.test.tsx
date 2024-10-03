import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/header";

describe("Header component", () => {
  it("renders logo, text and user icon", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const logo = screen.getByTestId("talent-adore-svg-logo");
    expect(logo).toBeInTheDocument();
    const userIcon = screen.getByTestId("user-svg-icon");
    expect(userIcon).toBeInTheDocument();
    const quizTakerText = screen.getByText("Quiz Taker");
    expect(quizTakerText).toBeInTheDocument();
  });
});
