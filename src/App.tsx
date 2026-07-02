import { useEffect, useState } from "react";
import { getEnergyMix } from "./api/energyApi";
import type { DailyEnergyMix } from "./api/energyApi";
import { EnergyPieChart } from "./components/EnergyPieChart";
import { ChargingForm } from "./components/ChargingForm";
import "./App.css";

function App() {
  const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <main>
      <h1>Energy Mix UK</h1>

      <p>
        Aplikacja pokazuje miks energetyczny Wielkiej Brytanii oraz najlepszy
        czas ładowania auta elektrycznego pod względem udziału czystej energii.
      </p>

      {loading && <p>Ładowanie danych...</p>}

      {error && <p className="error">{error}</p>}

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