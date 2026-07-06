import { fireEvent, render, screen } from "@testing-library/react";
import { translations } from "../i18n/i18n";
import { EnergyMixSection } from "./EnergyMixSection";

vi.mock("./EnergyPieChart", () => ({
  EnergyPieChart: ({ day }: { day: { date: string } }) => (
    <article data-testid="energy-chart">{day.date}</article>
  )
}));

describe("EnergyMixSection", () => {
  it("shows error alert and wires retry button", () => {
    const onRetry = vi.fn();

    render(
      <EnergyMixSection
        energyMix={[]}
        error={true}
        loading={false}
        selectedFuels={[]}
        t={translations.en}
        onFuelSelect={vi.fn()}
        onRetry={onRetry}
      />
    );

    expect(screen.getByText(translations.en.energyMixError)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: translations.en.retry }));

    expect(onRetry).toHaveBeenCalled();
  });

  it("shows loading state while data is loading", () => {
    render(
      <EnergyMixSection
        energyMix={[]}
        error={false}
        loading={true}
        selectedFuels={[]}
        t={translations.en}
        onFuelSelect={vi.fn()}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent(translations.en.loading);
  });

  it("shows empty state when there is no data", () => {
    render(
      <EnergyMixSection
        energyMix={[]}
        error={false}
        loading={false}
        selectedFuels={[]}
        t={translations.en}
        onFuelSelect={vi.fn()}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getByText(translations.en.emptyState)).toBeInTheDocument();
  });

  it("renders one chart per day and deduplicates fuels across days", () => {
    render(
      <EnergyMixSection
        energyMix={[
          {
            date: "2026-07-03",
            mix: { wind: 40, gas: 60 },
            cleanEnergyPercentage: 40
          },
          {
            date: "2026-07-04",
            mix: { wind: 20, solar: 30, gas: 50 },
            cleanEnergyPercentage: 50
          }
        ]}
        error={false}
        loading={false}
        selectedFuels={["solar"]}
        t={translations.en}
        onFuelSelect={vi.fn()}
        onRetry={vi.fn()}
      />
    );

    expect(screen.getAllByTestId("energy-chart")).toHaveLength(2);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "wind" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "gas" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "solar" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
