import { useState } from "react";
import { ChargingForm } from "./components/ChargingForm";
import { EnergyLegend } from "./components/EnergyLegend";
import { EnergyPieChart } from "./components/EnergyPieChart";
import { LoadingState } from "./components/LoadingState";
import { useEnergyMix } from "./hooks/useEnergyMix";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  const { energyMix, loading, error } = useEnergyMix();
  const { t, toggleLanguage } = useLanguage();
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

        <div className="app-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`${t.themeToggleLabel} ${
              theme === "dark" ? t.themeLight : t.themeDark
            }`}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>

          <button
            className="language-toggle"
            type="button"
            onClick={toggleLanguage}
            aria-label={t.languageToggleLabel}
          >
            {t.languageToggleText}
          </button>
        </div>
      </div>

      <p className="app-description">{t.appDescription}</p>

      {error && <p className="alert alert-error">{t.energyMixError}</p>}

      {loading ? (
        <LoadingState label={t.loading} />
      ) : (
        <>
          <EnergyLegend
            fuels={fuels}
            selectedFuel={selectedFuel}
            onFuelSelect={handleFuelSelect}
            ariaLabel={t.legendLabel}
          />

          {energyMix.length > 0 ? (
            <section className="grid">
              {energyMix.map((day) => (
                <EnergyPieChart
                  key={day.date}
                  day={day}
                  selectedFuel={selectedFuel}
                  onFuelSelect={handleFuelSelect}
                  cleanEnergyLabel={t.cleanEnergy}
                />
              ))}
            </section>
          ) : (
            <p className="empty-state">{t.emptyState}</p>
          )}
        </>
      )}

      <ChargingForm t={t} />
    </main>
  );
}

export default App;
