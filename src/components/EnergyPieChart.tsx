import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";
import type { DailyEnergyMix } from "../api/energyApi";

interface Props {
  day: DailyEnergyMix;
  selectedFuel: string | null;
  onFuelSelect: (fuel: string) => void;
}

const FUEL_COLORS: Record<string, string> = {
  biomass: "#0088FE",
  coal: "#00C49F",
  gas: "#FF8042",
  hydro: "#775DD0",
  imports: "#FFBB28",
  nuclear: "#AF19FF",
  other: "#FF4560",
  solar: "#26A69A",
  wind: "#546E7A"
};

export function getFuelColor(fuel: string) {
  return FUEL_COLORS[fuel] ?? "#8b95a7";
}

export function EnergyPieChart({ day, selectedFuel, onFuelSelect }: Props) {
  const chartData = Object.entries(day.mix).map(([fuel, value]) => ({
    name: fuel,
    value
  }));

  return (
    <div className="card">
      <h2>{day.date}</h2>

      <p>
        Czysta energia: <strong>{day.cleanEnergyPercentage}%</strong>
      </p>

      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 18, right: 34, bottom: 18, left: 34 }}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={96}
              label={({ value }) =>
                Number(value) >= 2 ? Number(value).toFixed(1) : ""
              }
              labelLine={false}
              onClick={(entry) => {
                if (entry.name) {
                  onFuelSelect(entry.name);
                }
              }}
              className="pie-slices"
            >
              {chartData.map((item) => (
                <Cell
                  key={item.name}
                  fill={getFuelColor(item.name)}
                  opacity={!selectedFuel || selectedFuel === item.name ? 1 : 0.38}
                  stroke={selectedFuel === item.name ? "var(--text-h)" : "none"}
                  strokeWidth={selectedFuel === item.name ? 3 : 0}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-h)"
              }}
              itemStyle={{ color: "var(--text-h)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
