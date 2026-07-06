import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { EnergyPieChart } from "./EnergyPieChart";

vi.mock("recharts", () => {
  return {
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    PieChart: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    Pie: ({
      children,
      data,
      onClick
    }: {
      children: ReactNode;
      data: Array<{ name: string; value: number }>;
      onClick: (entry: { name: string }) => void;
    }) => (
      <div data-testid="pie">
        {data.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onClick(item)}
          >
            {item.name}
          </button>
        ))}
        {children}
      </div>
    ),
    Cell: (props: {
      fill: string;
      opacity: number;
      "data-testid"?: string;
    }) => (
      <span
        data-testid="slice"
        data-fill={props.fill}
        data-opacity={props.opacity}
      />
    ),
    Tooltip: () => null
  };
});

describe("EnergyPieChart", () => {
  it("renders chart slices and clean energy label", () => {
    render(
      <EnergyPieChart
        day={{
          date: "2026-07-03",
          mix: { wind: 40, gas: 60 },
          cleanEnergyPercentage: 40
        }}
        selectedFuels={[]}
        onFuelSelect={vi.fn()}
        cleanEnergyLabel="Clean energy"
      />
    );

    expect(screen.getByRole("heading", { name: "2026-07-03" })).toBeInTheDocument();
    expect(screen.getByText("Clean energy")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getAllByTestId("slice")).toHaveLength(2);
  });

  it("dims unselected slices when a fuel is selected", () => {
    render(
      <EnergyPieChart
        day={{
          date: "2026-07-03",
          mix: { wind: 40, gas: 60 },
          cleanEnergyPercentage: 40
        }}
        selectedFuels={["wind"]}
        onFuelSelect={vi.fn()}
        cleanEnergyLabel="Clean energy"
      />
    );

    const [windSlice, gasSlice] = screen.getAllByTestId("slice");

    expect(windSlice).toHaveAttribute("data-opacity", "1");
    expect(gasSlice).toHaveAttribute("data-opacity", "0.38");
  });

  it("calls onFuelSelect when a slice is clicked", () => {
    const onFuelSelect = vi.fn();

    render(
      <EnergyPieChart
        day={{
          date: "2026-07-03",
          mix: { wind: 40 },
          cleanEnergyPercentage: 40
        }}
        selectedFuels={[]}
        onFuelSelect={onFuelSelect}
        cleanEnergyLabel="Clean energy"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "wind" }));

    expect(onFuelSelect).toHaveBeenCalledWith("wind");
  });
});
