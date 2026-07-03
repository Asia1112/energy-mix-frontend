import { getFuelColor } from "../fuelColors";

interface Props {
  fuels: string[];
  selectedFuel: string | null;
  onFuelSelect: (fuel: string) => void;
  ariaLabel: string;
}

export function EnergyLegend({
  fuels,
  selectedFuel,
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
            selectedFuel === fuel ? "legend-item-active" : ""
          }`}
          key={fuel}
          onClick={() => onFuelSelect(fuel)}
          aria-pressed={selectedFuel === fuel}
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
