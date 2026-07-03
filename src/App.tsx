import { useEffect, useState } from "react";
import { getEnergyMix } from "./api/energyApi";
import type { DailyEnergyMix } from "./api/energyApi";
import { EnergyPieChart, getFuelColor } from "./components/EnergyPieChart";
import { ChargingForm } from "./components/ChargingForm";
import "./App.css";

type Theme = "light" | "dark";

function App() {
  const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    async function loadEnergyMix() {
      try {
        const data = await getEnergyMix();
        setEnergyMix(data);
      } catch {
        setError("Nie udało się pobrać danych o miksie energetycznym.");
      } finally {
        setLoading(false);
      }
    }

    loadEnergyMix();
  }, []);

  const fuels = Array.from(
    new Set(energyMix.flatMap((day) => Object.keys(day.mix)))
  );

  return (
    <main>
      <div className="app-header">
        <h1>Energy Mix UK</h1>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Wlacz tryb ${theme === "dark" ? "jasny" : "ciemny"}`}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <p>
        Aplikacja pokazuje miks energetyczny Wielkiej Brytanii oraz najlepszy
        czas ładowania auta elektrycznego pod względem udziału czystej energii.
      </p>

      {loading && <p>Ładowanie danych...</p>}

      {error && <p className="error">{error}</p>}

      {fuels.length > 0 && (
        <div className="shared-legend" aria-label="Legenda paliw">
          {fuels.map((fuel) => (
            <span className="legend-item" key={fuel}>
              <span
                className="legend-color"
                style={{ backgroundColor: getFuelColor(fuel) }}
              />
              {fuel}
            </span>
          ))}
        </div>
      )}

      <section className="grid">
        {energyMix.map((day) => (
          <EnergyPieChart key={day.date} day={day} />
        ))}
      </section>

      <ChargingForm />
    </main>
  );
}

export default App;
