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
