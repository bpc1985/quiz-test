import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Title from "../Title";

vi.mock("@/assets/puzzle-piece-02.svg?react", () => ({
  default: () => <svg data-testid="puzzle-icon" />,
}));

describe("Title", () => {
  it("should render the title with the correct name", () => {
    const name = "Sample Title";
    render(<Title name={name} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(name);
  });

  it("should render the PuzzleIcon", () => {
    render(<Title name="Sample Title" />);
    expect(screen.getByTestId("puzzle-icon")).toBeInTheDocument();
  });

  it("should have the correct classes for layout", () => {
    render(<Title name="Sample Title" />);
    const container = screen.getByRole("heading", { level: 2 }).parentElement;
    expect(container).toHaveClass("flex", "items-center", "gap-4");
  });
});
