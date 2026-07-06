import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./api/energyApi", () => ({
  getEnergyMix: vi.fn(() => new Promise(() => undefined)),
  getChargingWindow: vi.fn()
}));

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the app header, energy section, and charging form together", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Energy Mix UK" })
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /najlepsze okno/i
      })
    ).toBeInTheDocument();
  });
});
