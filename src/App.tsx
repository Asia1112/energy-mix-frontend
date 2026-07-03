import { useState } from "react";
import { ChargingForm } from "./components/ChargingForm";
import { EnergyLegend } from "./components/EnergyLegend";
import { EnergyPieChart } from "./components/EnergyPieChart";
import { LoadingState } from "./components/LoadingState";
import { useEnergyMix } from "./hooks/useEnergyMix";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  const { energyMix, loading, error } = useEnergyMix();
  const { theme, toggleTheme } = useTheme();
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);

  const fuels = Array.from(
    new Set(energyMix.flatMap((day) => Object.keys(day.mix)))
  );

  function handleFuelSelect(fuel: string) {
    setSelectedFuel((currentFuel) => (currentFuel === fuel ? null : fuel));
  }

  return (
    <main>
      <div className="app-header">
        <h1>Energy Mix UK</h1>

        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Wlacz tryb ${theme === "dark" ? "jasny" : "ciemny"}`}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <p>
        Aplikacja pokazuje miks energetyczny Wielkiej Brytanii oraz najlepszy
        czas ladowania auta elektrycznego pod wzgledem udzialu czystej energii.
      </p>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <LoadingState />
      ) : (
        <>
          <EnergyLegend
            fuels={fuels}
            selectedFuel={selectedFuel}
            onFuelSelect={handleFuelSelect}
          />

          <section className="grid">
            {energyMix.map((day) => (
              <EnergyPieChart
                key={day.date}
                day={day}
                selectedFuel={selectedFuel}
                onFuelSelect={handleFuelSelect}
              />
            ))}
          </section>
        </>
      )}

      <ChargingForm />
    </main>
  );
}

export default App;
