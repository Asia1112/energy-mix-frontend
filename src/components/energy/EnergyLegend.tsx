import { getFuelColor } from "../../lib/fuelColors";

interface Props {
  fuels: string[];
  selectedFuels: string[];
  onFuelSelect: (fuel: string) => void;
  ariaLabel: string;
}

export function EnergyLegend({
  fuels,
  selectedFuels,
  onFuelSelect,
  ariaLabel
}: Props) {
  if (fuels.length === 0) {
    return null;
  }

  return (
    <div className="shared-legend" aria-label={ariaLabel}>
      {fuels.map((fuel) => (
        <button
          type="button"
          className={`legend-item ${
            selectedFuels.includes(fuel) ? "legend-item-active" : ""
          }`}
          key={fuel}
          onClick={() => onFuelSelect(fuel)}
          aria-pressed={selectedFuels.includes(fuel)}
        >
          <span
            className="legend-color"
            style={{ backgroundColor: getFuelColor(fuel) }}
          />
          {fuel}
        </button>
      ))}
    </div>
  );
}
