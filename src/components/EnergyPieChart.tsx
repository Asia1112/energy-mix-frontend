import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import type { DailyEnergyMix } from "../api/energyApi";
import { getFuelColor } from "../fuelColors";

interface Props {
  day: DailyEnergyMix;
  selectedFuel: string | null;
  onFuelSelect: (fuel: string) => void;
}

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  value?: number;
}

const RADIAN = Math.PI / 180;

function renderPieLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  value = 0
}: PieLabelProps) {
  if (value < 2) {
    return null;
  }

  const labelRadius = outerRadius + 26;
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--text)"
      fontSize={13}
      fontWeight={700}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value.toFixed(1)}
    </text>
  );
}

export function EnergyPieChart({ day, selectedFuel, onFuelSelect }: Props) {
  const chartData = Object.entries(day.mix).map(([fuel, value]) => ({
    name: fuel,
    value
  }));

  return (
    <div className="card">
      <h2>{day.date}</h2>

      <p className="clean-energy-badge">
        Czysta energia <strong>{day.cleanEnergyPercentage}%</strong>
      </p>

      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 18, right: 34, bottom: 18, left: 34 }}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={76}
              label={renderPieLabel}
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
                  opacity={
                    !selectedFuel || selectedFuel === item.name ? 1 : 0.38
                  }
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
