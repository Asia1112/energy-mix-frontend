import { getFuelColor } from "./EnergyPieChart";

interface Props {
  fuels: string[];
  selectedFuel: string | null;
}

export function EnergyLegend({ fuels, selectedFuel }: Props) {
  if (fuels.length === 0) {
    return null;
  }

  return (
    <div className="shared-legend" aria-label="Legenda paliw">
      {fuels.map((fuel) => (
        <span
          className={`legend-item ${
            selectedFuel === fuel ? "legend-item-active" : ""
          }`}
          key={fuel}
        >
          <span
            className="legend-color"
            style={{ backgroundColor: getFuelColor(fuel) }}
          />
          {fuel}
        </span>
      ))}
    </div>
  );
}
