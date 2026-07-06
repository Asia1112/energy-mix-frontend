import { fireEvent, render, screen } from "@testing-library/react";
import { EnergyLegend } from "./EnergyLegend";

describe("EnergyLegend", () => {
  it("renders nothing when there are no fuels", () => {
    const { container } = render(
      <EnergyLegend
        fuels={[]}
        selectedFuels={[]}
        onFuelSelect={vi.fn()}
        ariaLabel="Fuel legend"
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders one button per fuel", () => {
    render(
      <EnergyLegend
        fuels={["wind", "gas"]}
        selectedFuels={[]}
        onFuelSelect={vi.fn()}
        ariaLabel="Fuel legend"
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "wind" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "gas" })).toBeInTheDocument();
  });

  it("marks selected fuels as active and pressed", () => {
    render(
      <EnergyLegend
        fuels={["wind", "gas"]}
        selectedFuels={["wind"]}
        onFuelSelect={vi.fn()}
        ariaLabel="Fuel legend"
      />
    );

    const windButton = screen.getByRole("button", { name: "wind" });
    const gasButton = screen.getByRole("button", { name: "gas" });

    expect(windButton).toHaveClass("legend-item-active");
    expect(windButton).toHaveAttribute("aria-pressed", "true");
    expect(gasButton).not.toHaveClass("legend-item-active");
    expect(gasButton).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onFuelSelect when a fuel is clicked", () => {
    const onFuelSelect = vi.fn();

    render(
      <EnergyLegend
        fuels={["wind"]}
        selectedFuels={[]}
        onFuelSelect={onFuelSelect}
        ariaLabel="Fuel legend"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "wind" }));

    expect(onFuelSelect).toHaveBeenCalledWith("wind");
  });
});
