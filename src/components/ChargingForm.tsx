import { useState } from "react";
import { getChargingWindow } from "../api/energyApi";
import type { ChargingWindowResult } from "../api/energyApi";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pl-PL", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

export function ChargingForm() {
  const [hours, setHours] = useState("3");
  const [result, setResult] = useState<ChargingWindowResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);

    const hoursValue = Number(hours);

    if (!hours || hoursValue < 1 || hoursValue > 6) {
      setError("Wpisz czas ładowania od 1 do 6 godzin.");
      return;
    }

    try {
      const data = await getChargingWindow(hoursValue);
      setResult(data);
    } catch {
      setError("Nie udało się obliczyć najlepszego okna ładowania.");
    }
  }

  return (
    <section className="card charging-card">
      <div className="section-heading">
        <h2>Najlepsze okno ładowania auta</h2>
        <p>
          Sprawdź, kiedy ładować auto przy najwyższym udziale czystej energii.
        </p>
      </div>

      <form className="charging-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Czas ładowania</span>
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
          Od 1 do 6 godzin
        </p>

        <button type="submit">Oblicz</button>
      </form>

      {error && <p className="alert alert-error">{error}</p>}

      {result && (
        <div className="result">
          <div>
            <span>Start</span>
            <strong>{formatDate(result.start)}</strong>
          </div>
          <div>
            <span>Koniec</span>
            <strong>{formatDate(result.end)}</strong>
          </div>
          <div>
            <span>Średni udział czystej energii</span>
            <strong>{result.averageCleanEnergyPercentage}%</strong>
          </div>
        </div>
      )}
    </section>
  );
}
