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
  const [hours, setHours] = useState(3);
  const [result, setResult] = useState<ChargingWindowResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const data = await getChargingWindow(hours);
      setResult(data);
    } catch {
      setError("Nie udało się obliczyć najlepszego okna ładowania.");
    }
  }

  return (
    <div className="card">
      <h2>Najlepsze okno ładowania auta</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Czas ładowania, od 1 do 6 godzin:
          <input
            type="number"
            min="1"
            max="6"
            step="1"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
          />
        </label>

        <button type="submit">Oblicz</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>
            Start: <strong>{formatDate(result.start)}</strong>
          </p>
          <p>
            Koniec: <strong>{formatDate(result.end)}</strong>
          </p>
          <p>
            Średni udział czystej energii:{" "}
            <strong>{result.averageCleanEnergyPercentage}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}