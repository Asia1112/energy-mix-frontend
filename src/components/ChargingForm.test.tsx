import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChargingForm } from "./ChargingForm";
import { getChargingWindow } from "../api/energyApi";

vi.mock("../api/energyApi", () => ({
  getChargingWindow: vi.fn()
}));

const mockedGetChargingWindow = vi.mocked(getChargingWindow);

describe("ChargingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the input empty while the user deletes the current value", () => {
    render(<ChargingForm />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "" } });

    expect(input.value).toBe("");
  });

  it("shows validation and does not call the API for an empty value", () => {
    render(<ChargingForm />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Oblicz" }));

    expect(screen.getByText("Wpisz czas ladowania od 1 do 6 godzin."))
      .toBeInTheDocument();
    expect(mockedGetChargingWindow).not.toHaveBeenCalled();
  });

  it("calls the API with the typed number and shows the result", async () => {
    mockedGetChargingWindow.mockResolvedValueOnce({
      start: "2026-07-04T00:00:00Z",
      end: "2026-07-04T03:00:00Z",
      averageCleanEnergyPercentage: 82.5
    });

    render(<ChargingForm />);

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "3" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Oblicz" }));

    await waitFor(() => {
      expect(mockedGetChargingWindow).toHaveBeenCalledWith(3);
    });

    expect(screen.getByText("82.5%")).toBeInTheDocument();
  });
});
