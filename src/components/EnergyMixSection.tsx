import type { DailyEnergyMix } from "../api/energyApi";
import type { Translations } from "../i18n";
import { EnergyLegend } from "./EnergyLegend";
import { EnergyPieChart } from "./EnergyPieChart";
import { LoadingState } from "./LoadingState";

interface Props {
  energyMix: DailyEnergyMix[];
  error: boolean;
  loading: boolean;
  selectedFuel: string | null;
  t: Translations;
  onFuelSelect: (fuel: string) => void;
}

function getFuels(energyMix: DailyEnergyMix[]): string[] {
  return Array.from(new Set(energyMix.flatMap((day) => Object.keys(day.mix))));
}

export function EnergyMixSection({
  energyMix,
  error,
  loading,
  selectedFuel,
  t,
  onFuelSelect
}: Props) {
  const fuels = getFuels(energyMix);

  return (
    <>
      <p className="app-description">{t.appDescription}</p>

      {error && <p className="alert alert-error">{t.energyMixError}</p>}

      {loading ? (
        <LoadingState label={t.loading} />
      ) : (
        <>
          <EnergyLegend
            fuels={fuels}
            selectedFuel={selectedFuel}
            onFuelSelect={onFuelSelect}
            ariaLabel={t.legendLabel}
          />

          {energyMix.length > 0 ? (
            <section className="grid">
              {energyMix.map((day) => (
                <EnergyPieChart
                  key={day.date}
                  day={day}
                  selectedFuel={selectedFuel}
                  onFuelSelect={onFuelSelect}
                  cleanEnergyLabel={t.cleanEnergy}
                />
              ))}
            </section>
          ) : (
            <p className="empty-state">{t.emptyState}</p>
          )}
        </>
      )}
    </>
  );
}
