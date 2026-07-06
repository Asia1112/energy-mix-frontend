import { AppHeader } from "../components/AppHeader";
import { ChargingForm } from "../components/ChargingForm";
import { EnergyMixSection } from "../components/EnergyMixSection";
import { useEnergyMix } from "../hooks/useEnergyMix";
import { useFuelSelection } from "../hooks/useFuelSelection";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

export function EnergyMixPage() {
  const { energyMix, loading, error, retry } = useEnergyMix();
  const { t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { selectedFuels, handleFuelSelect } = useFuelSelection();

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
        selectedFuels={selectedFuels}
        t={t}
        onFuelSelect={handleFuelSelect}
        onRetry={retry}
      />

      <ChargingForm t={t} />
    </main>
  );
}
