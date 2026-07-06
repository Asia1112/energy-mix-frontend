import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getChargingWindow } from "../api/energyApi";
import { translations } from "../i18n/i18n";
import { ChargingForm } from "./ChargingForm";

vi.mock("../api/energyApi", () => ({
  getChargingWindow: vi.fn()
}));

const mockedGetChargingWindow = vi.mocked(getChargingWindow);

describe("ChargingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the input empty while the user deletes the current value", () => {
    render(<ChargingForm t={translations.pl} />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "" } });

    expect(input.value).toBe("");
  });

  it("shows validation and does not call the API for an empty value", () => {
    render(<ChargingForm t={translations.pl} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(
      screen.getByRole("button", { name: translations.pl.chargingSubmit })
    );

    expect(
      screen.getByText(translations.pl.chargingValidation)
    ).toBeInTheDocument();
    expect(mockedGetChargingWindow).not.toHaveBeenCalled();
  });

  it("shows validation in English when English translations are active", () => {
    render(<ChargingForm t={translations.en} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "8" } });
    fireEvent.click(
      screen.getByRole("button", { name: translations.en.chargingSubmit })
    );

    expect(
      screen.getByText(translations.en.chargingValidation)
    ).toBeInTheDocument();
    expect(mockedGetChargingWindow).not.toHaveBeenCalled();
  });

  it("shows validation and does not call the API for decimal hours", () => {
    render(<ChargingForm t={translations.en} />);

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "1.5" } });
    fireEvent.click(
      screen.getByRole("button", { name: translations.en.chargingSubmit })
    );

    expect(
      screen.getByText(translations.en.chargingValidation)
    ).toBeInTheDocument();
    expect(mockedGetChargingWindow).not.toHaveBeenCalled();
  });

  it("calls the API with the typed number and shows the result", async () => {
    mockedGetChargingWindow.mockResolvedValueOnce({
      start: "2026-07-04T00:00:00Z",
      end: "2026-07-04T03:00:00Z",
      averageCleanEnergyPercentage: 82.5
    });

    render(<ChargingForm t={translations.pl} />);

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "3" }
    });
    fireEvent.click(
      screen.getByRole("button", { name: translations.pl.chargingSubmit })
    );

    await waitFor(() => {
      expect(mockedGetChargingWindow).toHaveBeenCalledWith(3);
    });

    expect(screen.getByText("82.5%")).toBeInTheDocument();
  });

  it("shows a loading spinner while calculating the charging window", async () => {
    type ChargingResponse = Awaited<ReturnType<typeof getChargingWindow>>;
    let resolveRequest: (value: ChargingResponse) => void;

    mockedGetChargingWindow.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveRequest = resolve;
      })
    );

    render(<ChargingForm t={translations.en} />);

    fireEvent.click(
      screen.getByRole("button", { name: translations.en.chargingSubmit })
    );

    const loadingButton = screen.getByRole("button", {
      name: translations.en.chargingLoading
    });

    expect(loadingButton).toBeDisabled();
    expect(loadingButton.querySelector(".loading-spinner")).toBeInTheDocument();

    resolveRequest!({
      start: "2026-07-04T00:00:00Z",
      end: "2026-07-04T03:00:00Z",
      averageCleanEnergyPercentage: 82.5
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: translations.en.chargingSubmit })
      ).toBeEnabled();
    });
  });
});
