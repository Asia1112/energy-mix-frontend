import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";
import type { DailyEnergyMix } from "../api/energyApi";

interface Props {
  day: DailyEnergyMix;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#775DD0",
  "#26A69A",
  "#546E7A"
];

export function EnergyPieChart({ day }: Props) {
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
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
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
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
