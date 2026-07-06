import type { DailyEnergyMix } from "../api/energyApi";
import type { Translations } from "../i18n/i18n";
import { EnergyLegend } from "./EnergyLegend";
import { EnergyPieChart } from "./EnergyPieChart";
import { LoadingState } from "./LoadingState";

interface Props {
  energyMix: DailyEnergyMix[];
  error: boolean;
  loading: boolean;
  selectedFuels: string[];
  t: Translations;
  onFuelSelect: (fuel: string) => void;
  onRetry: () => void;
}

function getFuels(energyMix: DailyEnergyMix[]): string[] {
  return Array.from(new Set(energyMix.flatMap((day) => Object.keys(day.mix))));
}

export function EnergyMixSection({
  energyMix,
  error,
  loading,
  selectedFuels,
  t,
  onFuelSelect,
  onRetry
}: Props) {
  const fuels = getFuels(energyMix);

  return (
    <>
      <p className="app-description">{t.appDescription}</p>

      {error && (
        <div className="alert alert-error retry-alert">
          <p>{t.energyMixError}</p>
          <button type="button" onClick={onRetry}>
            {t.retry}
          </button>
        </div>
      )}

      {loading ? (
        <LoadingState label={t.loading} />
      ) : (
        <>
          <EnergyLegend
            fuels={fuels}
            selectedFuels={selectedFuels}
            onFuelSelect={onFuelSelect}
            ariaLabel={t.legendLabel}
          />

          {energyMix.length > 0 ? (
            <section className="grid">
              {energyMix.map((day) => (
                <EnergyPieChart
                  key={day.date}
                  day={day}
                  selectedFuels={selectedFuels}
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
