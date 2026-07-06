import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { ChargingForm } from "./components/ChargingForm";
import { EnergyMixSection } from "./components/EnergyMixSection";
import { useEnergyMix } from "./hooks/useEnergyMix";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  const { energyMix, loading, error } = useEnergyMix();
  const { t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);

  function handleFuelSelect(fuel: string) {
    setSelectedFuel((currentFuel) => (currentFuel === fuel ? null : fuel));
  }

  return (
    <main>
      <AppHeader
        t={t}
        theme={theme}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
      />

      <EnergyMixSection
        energyMix={energyMix}
        error={error}
        loading={loading}
        selectedFuel={selectedFuel}
        t={t}
        onFuelSelect={handleFuelSelect}
      />

      <ChargingForm t={t} />
    </main>
  );
}

export default App;
