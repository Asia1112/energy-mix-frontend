import { render, screen } from "@testing-library/react";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("renders a status region with the label", () => {
    render(<LoadingState label="Loading data..." />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading data...");
  });
});
