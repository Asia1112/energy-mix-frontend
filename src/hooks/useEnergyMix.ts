import { useEffect, useState } from "react";
import { getEnergyMix } from "../api/energyApi";
import type { DailyEnergyMix } from "../api/energyApi";

export function useEnergyMix() {
  const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEnergyMix() {
      try {
        const data = await getEnergyMix();
        setEnergyMix(data);
      } catch {
        setError("Nie udalo sie pobrac danych o miksie energetycznym.");
      } finally {
        setLoading(false);
      }
    }

    loadEnergyMix();
  }, []);

  return {
    energyMix,
    loading,
    error
  };
}
