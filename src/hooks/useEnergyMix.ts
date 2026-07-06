import { useCallback, useEffect, useState } from "react";
import { getEnergyMix } from "../api/energyApi";
import type { DailyEnergyMix } from "../api/energyApi";

export function useEnergyMix() {
  const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadEnergyMix = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getEnergyMix();
      setEnergyMix(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnergyMix();
  }, [loadEnergyMix]);

  return {
    energyMix,
    loading,
    error,
    retry: loadEnergyMix
  };
}
