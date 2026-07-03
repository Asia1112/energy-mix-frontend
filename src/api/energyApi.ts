import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const REQUEST_TIMEOUT_MS = 10000;

export interface DailyEnergyMix {
  date: string;
  mix: Record<string, number>;
  cleanEnergyPercentage: number;
}

export interface ChargingWindowResult {
  start: string;
  end: string;
  averageCleanEnergyPercentage: number;
}

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await axios.get(`${API_URL}/api/energy-mix`, {
    timeout: REQUEST_TIMEOUT_MS
  });
  return response.data;
}

export async function getChargingWindow(
  hours: number
): Promise<ChargingWindowResult> {
  const response = await axios.get(
    `${API_URL}/api/charging-window?hours=${hours}`,
    {
      timeout: REQUEST_TIMEOUT_MS
    }
  );
  return response.data;
}
