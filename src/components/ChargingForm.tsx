import { useState } from "react";
import { getChargingWindow } from "../api/energyApi";
import type { ChargingWindowResult } from "../api/energyApi";
import type { Translations } from "../i18n";

interface Props {
  t: Translations;
}

type ChargingError = "validation" | "request";

function formatDate(
  dateString: string,
  locale: string,
  hour12: boolean
): string {
  return new Date(dateString).toLocaleString(locale, {
    dateStyle: "short",
    timeStyle: "short",
    hour12
  });
}

export function ChargingForm({ t }: Props) {
  const [hours, setHours] = useState("3");
  const [result, setResult] = useState<ChargingWindowResult | null>(null);
  const [error, setError] = useState<ChargingError | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setResult(null);

    const hoursValue = Number(hours);

    if (
      !hours ||
      !Number.isInteger(hoursValue) ||
      hoursValue < 1 ||
      hoursValue > 6
    ) {
      setError("validation");
      return;
    }

    try {
      const data = await getChargingWindow(hoursValue);
      setResult(data);
    } catch {
      setError("request");
    }
  }

  return (
    <section className="card charging-card">
      <div className="section-heading">
        <h2>{t.chargingTitle}</h2>
        <p>{t.chargingDescription}</p>
      </div>

      <form className="charging-form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span>{t.chargingTime}</span>
          <input
            type="number"
            min="1"
            max="6"
            step="1"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            aria-describedby="charging-hours-hint"
          />
        </label>

        <p className="field-hint" id="charging-hours-hint">
          {t.chargingHint}
        </p>

        <button type="submit">{t.chargingSubmit}</button>
      </form>

      {error && (
        <p className="alert alert-error">
          {error === "validation" ? t.chargingValidation : t.chargingError}
        </p>
      )}

      {result && (
        <div className="result">
          <div>
            <span>{t.resultStart}</span>
            <strong>
              {formatDate(result.start, t.dateLocale, t.dateHour12)}
            </strong>
          </div>
          <div>
            <span>{t.resultEnd}</span>
            <strong>
              {formatDate(result.end, t.dateLocale, t.dateHour12)}
            </strong>
          </div>
          <div>
            <span>{t.resultAverageCleanEnergy}</span>
            <strong>{result.averageCleanEnergyPercentage}%</strong>
          </div>
        </div>
      )}
    </section>
  );
}
